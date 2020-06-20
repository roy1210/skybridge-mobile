import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { PAGE_COUNT } from "../../data/constants";
import { SwapRawObject } from "../../types/swapApp";
import { get } from "../../utils/apiClient";
import { isAddress } from "../../utils/validator";
// import { IApplicationState } from "../index";
import { addComma } from "./../../utils/addComma";
import {
  checkTransactionLength,
  fetchFloatsAsync,
  fetchSwapHistoryAsync,
} from "./actions";
import {
  FETCH_FLOATS_REQUEST,
  FETCH_SWAP_HISTORY_REQUEST,
  IFetchSwapHistoryResponse,
  ITransactions,
  TxStatus,
} from "./types";
import { IApplicationState } from "../types";
import {
  REACT_APP_API,
  REACT_APP_API_FLOAT_BALANCES,
} from "react-native-dotenv";

const {
  COMPLETED,
  REJECTED,
  CANCELED,
  BROADCASTED,
  SENDING,
  PENDING,
  SIGNING,
  REFUNDING,
  SIGNING_REFUND,
  REFUNDED,
} = TxStatus;

function* handleFetchHistory(action): Generator {
  // action: ReturnType<typeof fetchSwapHistoryAsync.request>
  const { query, page } = action.payload;
  const isHideWaiting = yield select(
    ({ explorer }: IApplicationState) => explorer.isHideWaiting
  );

  const baseUrl = REACT_APP_API + "/api/v1/swaps/query";

  let txsWithPage: ITransactions = {
    data: {
      [page]: [],
    },
    total: 0,
  };

  const prev = yield select(
    ({ explorer }: IApplicationState) => explorer.swapHistory
  );
  if (prev !== null) {
    // @ts-ignore
    txsWithPage = prev;
  }

  try {
    let url = "";
    let nextPageUrl = "";
    let oneMoreNextPageUrl = "";
    if (query !== "") {
      // Memo: Status query parameter is not working when searching address or hash
      if (!isHideWaiting) {
        const isAddr = isAddress(query);
        const f = isAddr ? "address" : "hash";

        url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&OR_in_${f}=${query}&OR_out_${f}=${query}&sort=0`;
        console.log("url", url);

        nextPageUrl = `${baseUrl}?page=${
          page + 1
        }&page_size=${PAGE_COUNT}&OR_in_${f}=${query}&OR_out_${f}=${query}&sort=0`;

        oneMoreNextPageUrl = `${baseUrl}?page=${
          page + 2
        }&page_size=${PAGE_COUNT}&OR_in_${f}=${query}&OR_out_${f}=${query}&sort=0`;
      }
      // Memo: query === ""
    } else {
      if (!isHideWaiting) {
        url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&sort=0`;
        nextPageUrl = `${baseUrl}?page=${
          page + 1
        }&page_size=${PAGE_COUNT}&sort=0`;

        oneMoreNextPageUrl = `${baseUrl}?page=${
          page + 2
        }&page_size=${PAGE_COUNT}&sort=0`;
      } else {
        url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&status=${COMPLETED},${REJECTED},${CANCELED},${BROADCASTED},${SENDING},${PENDING},${SIGNING},${REFUNDING},${SIGNING_REFUND},${REFUNDED}&sort=0`;

        nextPageUrl = `${baseUrl}?page=${
          page + 1
        }&page_size=${PAGE_COUNT}&status=${COMPLETED},${REJECTED},${CANCELED},${BROADCASTED},${SENDING},${PENDING},${SIGNING},${REFUNDING},${SIGNING_REFUND},${REFUNDED}&sort=0`;

        oneMoreNextPageUrl = `${baseUrl}?page=${
          page + 2
        }&page_size=${PAGE_COUNT}&status=${COMPLETED},${REJECTED},${CANCELED},${BROADCASTED},${SENDING},${PENDING},${SIGNING},${REFUNDING},${SIGNING_REFUND},${REFUNDED}&sort=0`;
      }
    }

    // @ts-ignore
    const [res, nextPageRes, oneMoreNextPageRes] = yield all([
      call(get, url),
      call(get, nextPageUrl),
      call(get, oneMoreNextPageUrl),
    ]);

    // @ts-ignore
    const txRes: IFetchSwapHistoryResponse = res.parsedBody;
    const txsResItems: SwapRawObject[] = txRes.items;
    const txs: SwapRawObject[] = txsResItems.filter(
      (tx, idx, self) =>
        !tx.txIdIn || self.findIndex((_tx) => _tx.txIdIn === tx.txIdIn) === idx
    );
    const delta = txsResItems.length - txs.length;

    // @ts-ignore
    const nextPageTxRes: IFetchSwapHistoryResponse = nextPageRes.parsedBody;
    const nextPageTxsResItems: SwapRawObject[] = nextPageTxRes.items;
    const nextPageTxs: SwapRawObject[] = nextPageTxsResItems.filter(
      (tx, idx, self) =>
        !tx.txIdIn || self.findIndex((_tx) => _tx.txIdIn === tx.txIdIn) === idx
    );

    // @ts-ignore
    const oneMoreNextPageTxRes: IFetchSwapHistoryResponse =
      oneMoreNextPageRes.parsedBody;
    const oneMoreNextPageTxsResItems: SwapRawObject[] =
      oneMoreNextPageTxRes.items;
    const oneMoreNextPageTxs: SwapRawObject[] = oneMoreNextPageTxsResItems.filter(
      (tx, idx, self) =>
        !tx.txIdIn || self.findIndex((_tx) => _tx.txIdIn === tx.txIdIn) === idx
    );

    yield put(checkTransactionLength(txs.length === 0));

    txsWithPage = {
      data: {
        ...txsWithPage.data, // Merge the new one with the previous one.
        [page]: txs,
        [page + 1]: nextPageTxs,
        [page + 2]: oneMoreNextPageTxs,
      },
      total: txRes.total - delta,
    };

    yield put(fetchSwapHistoryAsync.success(txsWithPage));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchSwapHistoryAsync.failure(err));
    }
  }
}

/**
 * Calls Floats API.
 * @param action
 */
function* handleFetchFloats(
  action: ReturnType<typeof fetchFloatsAsync.request>
): Generator {
  let floats = {
    btc: "0",
    btcb: "0",
    bnb: "0",
  };
  const url = REACT_APP_API_FLOAT_BALANCES;

  try {
    // @ts-ignore
    const res = yield call(get, url);
    // @ts-ignore
    const floatBalances: IFloatBalance = res.parsedBody.balances;
    floats = {
      btc: addComma(Number(floatBalances.BTC.confirmed), 2),
      // @ts-ignore
      btcb: addComma(Number(floatBalances["BTC.B-888"]), 2),
      bnb: addComma(Number(floatBalances.BNB), 2),
    };

    yield put(fetchFloatsAsync.success(floats));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchFloatsAsync.failure(err));
    }
  }
}

export default function* explorerSaga() {
  yield all([
    takeLatest(FETCH_SWAP_HISTORY_REQUEST, handleFetchHistory),
    takeLatest(FETCH_FLOATS_REQUEST, handleFetchFloats),
  ]);
}
