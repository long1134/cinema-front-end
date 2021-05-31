import freeze from "deep-freeze"
import { handleActions } from "redux-actions"
import * as actions from "./actions"

export const name = "MemberPage"

const intialState = freeze({
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
    tickets: [],
    dialogStatus: false
})

export default handleActions({
    [actions.getTicketsSuccess]: (state, action) => {
        return freeze({
            ...state,
            tickets: action.payload.tickets
        })
    },
    [actions.saveInfoSuccess]: (state, action) => {
        return freeze({
            ...state,
            cinema: action.payload.cinema
        })
    },
    [actions.handleInitDataSuccess]: (state, action) => {
        return freeze({
            ...state,
            data: { ...action.payload }
        })
    },
    [actions.handleChangeDate]: (state, action) => {
        console.log(action.payload)
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
    },
    [actions.handleDialog]: (state, action) => {
        console.log(action.payload)
        return freeze({
            ...state,
            dialogStatus: action.payload.status
        })
    }
},
    intialState
)