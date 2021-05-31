import { put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import api from "../../../services/api"
import * as actions from "../actions"
import * as coockie from "js-cookie"

const infoMemberURL = api.urlGetInfoMember
const updateInfoMemberURL = api.urlUpdateInfoMember
const ticketsInfoMemberURL = api.urlTicketsInfoMember

export function* handleInitData() {
    try {
        let token = coockie.get("token")
        let data = {}
        yield axios({
            method: "post",
            url: infoMemberURL,
            data: { token }
        }).then((res) => {
            data = res.data
        }).catch(e => {
            console.log(e)
        })
        yield put(actions.handleInitDataSuccess(data))
    } catch (e) {
        console.log(e)
    }
}

export function* initData() {
    yield takeEvery(actions.handleInitData, handleInitData)
}

export function* handleSaveData(action) {
    try {
        let data = {}
        yield axios({
            method: "put",
            url: updateInfoMemberURL,
            data: {
                token: action.payload.token,
                data: {
                    ...action.payload.data
                }
            }
        }).then((res) => {
            data.data = res.data
        }).catch(e => {
            console.log(e)
        })
        yield put(actions.saveInfoSuccess(data))
    } catch (e) {
        console.log(e)
    }
}

export function* saveData() {
    yield takeEvery(actions.saveInfo, handleSaveData)
}

export function* handleGetTickets(action) {
    try {
        let token = coockie.get("token")
        let data = {}
        yield axios({
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            url: ticketsInfoMemberURL,
            data: { token }
        }).then((res) => {
            data.tickets = res.data
        }).catch(e => {
            return console.log(e)
        })
        yield put(actions.getTicketsSuccess(data))
    } catch (e) {
        console.log(e)
    }
}

export function* getTickets() {
    yield takeEvery(actions.getTickets, handleGetTickets)
}

export default {
    saveData,
    initData,
    getTickets
}