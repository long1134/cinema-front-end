import { createAction } from "redux-actions"
import * as CONST from "./constants"

export const login = createAction(CONST.LOGIN)
export const loginSuccess = createAction(CONST.LOGINSUCCESS)
export const loginFail = createAction(CONST.LOGINFAIL)

export const register = createAction(CONST.REGISTER)
export const registerSuccess = createAction(CONST.REGISTERSUCCESS)
export const registerFail = createAction(CONST.REGISTERFAIL)

export const handleDialog = createAction(CONST.HANDLEDIALOG)
export const handleLogout = createAction(CONST.HANDLELOGOUT)
export const handleChangeTypeForm = createAction(CONST.HANDLECHANGETYPEFORM)
export const handleChangeText = createAction(CONST.HANDLECHANGETEXT)
export const handleChangeDate = createAction(CONST.HANDLECHANGEDATE)