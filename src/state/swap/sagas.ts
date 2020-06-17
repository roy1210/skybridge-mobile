import { toSatoshi } from "./../../utils/toSatoshi";
import { camelize } from "./../../utils/camelize";
import {
  REACT_APP_API,
  REACT_APP_BLOCKCHAIN_INFO,
  REACT_APP_INDEXER_POOL,
} from "react-native-dotenv";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { get, post } from "../../utils/apiClient";
import * as validator from "../../utils/validator";
import { IApplicationState } from "./../types";
import {
  fetchFeesAsync,
  fetchPriceAsync,
  inputReceivingAmount,
  inputSendingAmount,
  validateInput,
  createSwapAsync,
  calculateSwapAsync,
  fetchInfoAsync,
  setTxHash,
  fetchIndexerAsync,
  fetchDepositAddressAsync,
} from "./actions";
import * as SwapActionTypes from "./types";
import {
  IFetchFees,
  IFetchPriceResponse,
  ICreateSwapRequest,
  ICalculateSwapResponse,
  IFetchIndexer,
} from "./types";
import { searchTssAddress } from "../../utils/searchTssAddress";
import { CoinSymbol } from "../../data/constants";

/**
 * Called when a user inputs sending amount.
 * 1. Validates the input balance, and updates the Redux state about validation result.
 * 2. Calculates the receiving balance, and updates the Redux state about the receiving amount.
 * @param action
 */
function* checkSendingBalance(
  action: ReturnType<typeof inputSendingAmount>
): Generator {
  const symbol = yield select(
    ({ swap }: IApplicationState) => swap.fromCurrency
  );
  const balanceString = action.payload;
  const balance = Number(balanceString);

  const isValidAmountResult = validator.isValidAmount(
    balance,
    symbol as string
  );

  if (!isValidAmountResult.isValid) {
    yield put(
      validateInput(
        isValidAmountResult.isValid,
        isValidAmountResult.message || ""
      )
    );
  } else {
    yield put(
      validateInput(
        isValidAmountResult.isValid,
        isValidAmountResult.message || ""
      )
    );
  }
  // const rate = yield select(({ swap }: IApplicationState) => swap.rate);
  // const sendingAmount = yield select(
  //   ({ swap }: IApplicationState) => swap.sendingBalance
  // );
  // const calculatedAmount = Number(rate) * Number(sendingAmount);
  // yield put(inputReceivingAmount(calculatedAmount));
  yield put(inputReceivingAmount(balanceString));
}

/**
 * Fetches BTC price.
 * @param action
 */
function* handleFetchPrice(
  action: ReturnType<typeof fetchPriceAsync.request>
): Generator {
  const baseUrl = REACT_APP_BLOCKCHAIN_INFO;
  const url = baseUrl + "/ticker";
  try {
    const res: IFetchPriceResponse | unknown = yield call(get, url);
    // @ts-ignore
    yield put(fetchPriceAsync.success(res.parsedBody.USD["15m"]));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchPriceAsync.failure(err));
    }
  }
}

/**
 * Calls Create Swap API.
 * @param action
 */
function* handleCreateSwap(
  action: ReturnType<typeof createSwapAsync.request>
): Generator {
  const base = REACT_APP_API;
  const urlCalculate = base + "/api/v1/swaps/calculate";
  const urlCreate = base + "/api/v1/swaps/create";
  const reqPayload: ICreateSwapRequest = action.payload;

  let resCalculate = null;

  // FIXME: This is not elegant, so please refactor
  try {
    // @ts-ignore
    resCalculate = yield call(post, urlCalculate, {
      amount: String(reqPayload.amount),
      currency_from: reqPayload.fromCurrency,
      currency_to: reqPayload.toCurrency,
      address_to: reqPayload.receivingAddress,
    });
  } catch (err) {
    // NOTE: retry
    try {
      // @ts-ignore
      resCalculate = yield call(post, urlCalculate, {
        amount: String(reqPayload.amount),
        currency_from: reqPayload.fromCurrency,
        currency_to: reqPayload.toCurrency,
        address_to: reqPayload.receivingAddress,
      });
    } catch (err) {
      // NOTE: retry
      try {
        // @ts-ignore
        resCalculate = yield call(post, urlCalculate, {
          amount: String(reqPayload.amount),
          currency_from: reqPayload.fromCurrency,
          currency_to: reqPayload.toCurrency,
          address_to: reqPayload.receivingAddress,
        });
      } catch (err) {
        if (err instanceof Error) {
          yield put(createSwapAsync.failure(err));
          return;
        }
      }
    }
  }

  try {
    const bodyCalculate: ICalculateSwapResponse = camelize(
      // @ts-ignore
      resCalculate.parsedBody
    );
    const resCreate = yield call(post, urlCreate, {
      amount: bodyCalculate.sendAmount,
      currency_from: bodyCalculate.currencyFrom,
      currency_to: bodyCalculate.currencyTo,
      address_to: reqPayload.receivingAddress,
      nonce: bodyCalculate.nonce,
    });

    // @ts-ignore
    const body: ICreateSwapResponse = camelize(resCreate.parsedBody);
    yield put(createSwapAsync.success(body));
    yield put(calculateSwapAsync.success(bodyCalculate));

    // NOTE: Start monitoring the address.
    // monitorTx(body.addressIn);
  } catch (err) {
    if (err instanceof Error) {
      // TODO: error handling
      yield put(createSwapAsync.failure(err));
    }
  }
}

/**
 * Calls Swap Fees API.
 * @param action
 */
function* handleFetchFees(
  action: ReturnType<typeof fetchFeesAsync.request>
): Generator {
  // const url = REST_API() + "/api/v1/swaps/fees";
  const baseUrl = REACT_APP_API as string;
  const url = baseUrl + "/api/v1/swaps/fees";
  try {
    const res = yield call(get, url);
    // @ts-ignore
    const info: IFetchFees = res.parsedBody;
    yield put(fetchFeesAsync.success(info));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchFeesAsync.failure(err));
    }
  }
}

/**
 * Calls Info API.
 * @param action
 */
function* handleFetchInfo(
  action: ReturnType<typeof fetchInfoAsync.request>
): Generator {
  const baseUrl = REACT_APP_API;
  const url = baseUrl + "/api/v1/status";
  try {
    const res = yield call(get, url);
    // @ts-ignore
    const info: IFetchInfoResponse = res.parsedBody;
    yield put(fetchInfoAsync.success(info));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchInfoAsync.failure(err));
    }
  }
}

/**
 * Calls Indexer API.
 * @param action
 */
function* handleFetchIndexer(
  action: ReturnType<typeof fetchIndexerAsync.request>
): Generator {
  const amountIn = yield select(
    ({ swap }: IApplicationState) =>
      swap.createSwapRes && swap.createSwapRes.amountIn
  );
  const depositAddresses = yield select(
    ({ swap }: IApplicationState) =>
      swap.depositAddresses && swap.depositAddresses
  );

  const url = `${REACT_APP_INDEXER_POOL}?watch=${searchTssAddress(
    // @ts-ignore
    depositAddresses,
    CoinSymbol.BTC
  )}&height_from=0&height_to=0`;

  try {
    // Memo: `page` becomes more than 9 page is only 0.1% possibility. According to comment from Senga-san.
    // Memo: Increase page number if transaction volume going to really high
    const maximumPage = 10;

    for (let i = 0; i < maximumPage; i++) {
      const urlWithPage = `${url}&page=${i}&limit=0`;
      const res = yield call(get, urlWithPage);

      // @ts-ignore
      const indexer: IFetchIndexers = res.parsedBody.inTxsMempool;
      const filteredIndexer: IFetchIndexer = indexer.filter(
        (tx: IFetchIndexer) => {
          // @ts-ignore
          console.log("toSatoshi(amountIn)", toSatoshi(amountIn));
          console.log("Number(tx.amount)", Number(tx.amount));
          // @ts-ignore
          return Number(tx.amount) === toSatoshi(amountIn);
        }
      )[0];

      if (filteredIndexer) {
        yield put(setTxHash(filteredIndexer.txId));
        yield put(fetchIndexerAsync.success(filteredIndexer));
        break;
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchIndexerAsync.failure(err));
    }
  }
}

/**
 * Calls Info API.
 * @param action
 */
function* handleFetchDepositAddress(
  action: ReturnType<typeof fetchDepositAddressAsync.request>
): Generator {
  const baseUrl = REACT_APP_API;
  // const url = REST_API() + "/api/v1/addresses";
  const url = baseUrl + "/api/v1/addresses";
  try {
    const res = yield call(get, url);
    // @ts-ignore
    const data: IDepositAddresses = res.parsedBody;
    yield put(fetchDepositAddressAsync.success(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchDepositAddressAsync.failure(err));
    }
  }
}

export default function* swapSaga() {
  yield all([
    takeLatest(SwapActionTypes.INPUT_SENDING_BALANCE, checkSendingBalance),
    // takeLatest(
    //   SwapActionTypes.INPUT_RECEIVING_ADDRESS,
    //   handleToWalletAddressInput
    // ),
    // takeLatest(SwapActionTypes.GO_NEXT_STEP, handleNextActionButton),
    // takeLatest(SwapActionTypes.SET_RATE, recalculateAmount),
    // takeLatest(SwapActionTypes.SET_TX_HASH, handleSetTxHash),
    takeLatest(SwapActionTypes.FETCH_PRICE_REQUEST, handleFetchPrice),
    takeLatest(SwapActionTypes.CREATE_SWAP_REQUEST, handleCreateSwap),
    // takeLatest(SwapActionTypes.FETCH_TX_HASH_REQUEST, handleFetchTxHash),
    takeLatest(SwapActionTypes.FETCH_INFO_REQUEST, handleFetchInfo),
    takeLatest(SwapActionTypes.FETCH_INDEXER_REQUEST, handleFetchIndexer),
    takeLatest(
      SwapActionTypes.FETCH_DEPOSIT_ADDRESS_REQUEST,
      handleFetchDepositAddress
    ),
    takeLatest(SwapActionTypes.FETCH_FEES_REQUEST, handleFetchFees),
    // takeLatest(
    //   SwapActionTypes.FETCH_PLATFORM_STATUS_REQUEST,
    //   handlePlatformStatus
    // ),
  ]);
}
