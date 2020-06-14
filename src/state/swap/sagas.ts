import { takeEvery, put } from "redux-saga/effects";
import {
  GET_ALL_USER_INFO_REQUEST,
  GET_ALL_USER_INFO_REQUEST_SUCCESS,
  GetAllUserInfoRequest,
} from "./actions";

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
      },
    });
  } catch (err) {
    // Handle error
  }
}

function* handler() {
  yield takeEvery(GET_ALL_USER_INFO_REQUEST, getAllUserInfo);
}

export { handler };
