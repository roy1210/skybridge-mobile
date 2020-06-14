import { IFetchPriceResponse } from "./types";
import {
  GET_ALL_USER_INFO_REQUEST,
  GET_ALL_USER_INFO_REQUEST_SUCCESS,
  GetAllUserInfoRequest,
  fetchPriceAsync,
} from "./actions";
import { get, post } from "../../utils/apiClient";
import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import * as SwapActionTypes from "./types";

/**
 * Fetches BTC price.
 * @param action
 */
function* handleFetchPrice(
  action: ReturnType<typeof fetchPriceAsync.request>
): Generator {
  // const url = BLOCKCHAIN_INFO() + "/ticker";
  const url = "https://blockchain.info" + "/ticker";
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

function* getAllUserInfo(
  action: ReturnType<typeof GetAllUserInfoRequest>
): Generator {
  try {
    // API call
    yield put({
      type: GET_ALL_USER_INFO_REQUEST_SUCCESS,
      payload: {
        id: action.payload,
        name: "Michael22",
        email: "anothertestemail@test.com",
        number: 1,
      },
    });
  } catch (err) {
    // Handle error
  }
}

export default function* swapSaga() {
  yield all([
    // takeLatest(SwapActionTypes.INPUT_SENDING_BALANCE, checkSendingBalance),
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
    // takeLatest(SwapActionTypes.FETCH_FEES_REQUEST, handleFetchFees),
    // takeLatest(
    //   SwapActionTypes.FETCH_PLATFORM_STATUS_REQUEST,
    //   handlePlatformStatus
    // ),
  ]);
}
