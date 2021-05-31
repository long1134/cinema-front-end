import { put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import api from "../../../services/api"
import * as actions from "../actions"
import * as coockie from "js-cookie"

// const showtimesURL = api.urlShowtimes + "/"
const showtimesURL = api.urlShowtimes + "/"
const payURL = api.urlShowtimes + "/pay/"

export function* handleGetData(action) {
  try {
    let data = {}
    yield axios({
      method: "post",
      url: showtimesURL + action.payload,
    })
      .then((res) => {
        data = res.data
      })
      .catch((e) => {
        console.log(e)
      })
    yield put(actions.getDataSuccess(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getData() {
  yield takeEvery(actions.getData, handleGetData)
}

export function* handlePayTicket(action) {
  try {
    let data = {}
    console.log(action.payload)
    yield axios({
      method: "put",
      url: "http://localhost:8080/api/quest/showtimes/pay/" + action.payload.id,
      data: {
        showtimes: { ...action.payload.showtimes },
        detailSeats: action.payload.detailSeats,
        filmName: action.payload.filmName,
        token: coockie.get("token"),
      },
    })
      .then((res) => {
        data = res.data
      })
      .catch((e) => {
        console.log(e)
      })
    yield put(actions.handlePaySuccess(data))
  } catch (e) {
    console.log(e)
  }
}

export function* handlePay() {
  yield takeEvery(actions.handlePay, handlePayTicket)
}

export function* handleGetPaymentUrl(action) {
  try {
    let data = {}
    console.log(action.payload)
    yield axios({
      method: "put",
      url: payURL + action.payload.id,
      data: {
        idShowtime: action.payload.id,
        amount: action.payload.amount,
      },
    })
      .then((res) => {
        data = res.payUrl
      })
      .catch((e) => {
        console.log(e)
      })
    yield put(actions.getDataSuccess(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getPaymentUrl() {
  yield takeEvery(actions.getPaymentUrl, handleGetPaymentUrl)
}
export default {
  getData,
  handlePay,
  getPaymentUrl,
}
