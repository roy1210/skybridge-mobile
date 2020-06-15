import { REACT_APP_API, REACT_APP_BLOCKCHAIN_INFO } from "react-native-dotenv";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { get } from "../../utils/apiClient";
import * as validator from "../../utils/validator";
import { IApplicationState } from "./../types";
import {
  fetchFeesAsync,
  fetchPriceAsync,
  inputReceivingAmount,
  inputSendingAmount,
  validateInput,
} from "./actions";
import * as SwapActionTypes from "./types";
import { IFetchFees, IFetchPriceResponse } from "./types";

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
    // takeLatest(SwapActionTypes.CREATE_SWAP_REQUEST, handleCreateSwap),
    // takeLatest(SwapActionTypes.FETCH_TX_HASH_REQUEST, handleFetchTxHash),
    // takeLatest(SwapActionTypes.FETCH_INFO_REQUEST, handleFetchInfo),
    // takeLatest(SwapActionTypes.FETCH_INDEXER_REQUEST, handleFetchIndexer),
    // takeLatest(
    //   SwapActionTypes.FETCH_DEPOSIT_ADDRESS_REQUEST,
    //   handleFetchDepositAddress
    // ),
    takeLatest(SwapActionTypes.FETCH_FEES_REQUEST, handleFetchFees),
    // takeLatest(
    //   SwapActionTypes.FETCH_PLATFORM_STATUS_REQUEST,
    //   handlePlatformStatus
    // ),
  ]);
}
