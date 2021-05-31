import {put, takeEvery } from "redux-saga/effects"
import * as actions from "../actions"
import axios from "axios"
import api from  "../../../services/api"

const urlQuestLogin = api.urlQuestLogin

const urlQuestRegister= api.urlQuestRegister

export function* handleLogin(action){
    try{
        let data = {}
        let error = ""
        yield axios({
            method : "post",
            data : action.payload,
            url : urlQuestLogin
        }).then(res=> {
            data = res.data
        }).catch(err=>{
            error=err
        })
        if(error){
            return yield put(actions.loginFail(error))
        }
        yield put(actions.loginSuccess(data))
    }catch(err){
        console.log(err)
    }
}

export function* getLogin(){
    yield takeEvery(actions.login, handleLogin)
}

export function* handleRegister(action){
    try{
        let data = {}
        let error = ""
        console.log(action.payload)
        yield axios({
            method : "post",
            data : action.payload,
            url : urlQuestRegister
        }).then(res=> {
            data = res.data
        }).catch(err=>{
            error=err
        })
        if(error){
            return yield put(actions.registerFail(error))
        }
        yield put(actions.registerSuccess(data))
    }catch(err){
        console.log(err)
    }
}

export function* register(){
    yield takeEvery(actions.register, handleRegister)
}

export default {
    getLogin,
    register
}