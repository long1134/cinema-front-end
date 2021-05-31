import freeze from "deep-freeze"
import { handleActions } from "redux-actions"
import * as actions from "./actions"
import * as coockie from "js-cookie"

export const name = "WrappedMenu"

const intialState = freeze({
    errorStatus: false,
    messageError: "",
    dialogStatus: false,
    userInfo: coockie.get("userInfo") ? JSON.parse(coockie.get("userInfo")) : "",
    typeForm: "login",
    data: {
        birth: "2014-08-18",
        name: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        repassword: ""
    },
})

export default handleActions({
    [actions.loginSuccess]: (state, action) => {
        coockie.set("token", action.payload.token, { expires: 1 })
        coockie.set("userInfo", JSON.stringify(action.payload.user), { expires: 1 })
        return freeze({
            ...state,
            errorStatus: false,
            messageError: "",
            dialogStatus: false,
            userInfo: action.payload.user
        })
    },
    [actions.loginFail]: (state, action) => {
        return freeze({
            ...state,
            errorStatus: true,
            messageError: action.payload.response.data,
            userInfo: ""
        })
    },
    [actions.registerSuccess]: (state, action) => {
        return freeze({
            ...state,
            errorStatus: false,
            messageError: "",
            userInfo: action.payload.user,
            typeForm: "login"
        })
    },
    [actions.registerFail]: (state, action) => {
        return freeze({
            ...state,
            errorStatus: true,
            messageError: action.payload.response.data,
            userInfo: ""
        })
    },
    [actions.handleDialog]: (state, action) => {
        console.log(state)
        return freeze({
            ...state,
            dialogStatus: action.payload
        })
    },
    [actions.handleLogout]: (state, action) => {
        coockie.remove("token")
        coockie.remove("userInfo")
        return freeze({
            ...state,
            userInfo: ""
        })
    },
    [actions.handleChangeTypeForm]: (state, action) => {
        return freeze({
            ...state,
            typeForm: action.payload
        })
    },
    [actions.handleChangeDate]: (state, action) => {
        return freeze({
            ...state,
            data: {
                ...state.data,
                birth: action.payload
            }
        })
    },
    [actions.handleChangeText]: (state, action) => {
        return freeze({
            ...state,
            data: {
                ...state.data,
                [action.payload.name]: action.payload.value
            }
        })
    }
},
    intialState
)