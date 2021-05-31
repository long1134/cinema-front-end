import { createAction } from "redux-actions"
import * as CONST from "./constants"

export const getData = createAction(CONST.GET_DATA)
export const getDataSuccess = createAction(CONST.GET_DATA_SUCCESS)
export const getDataFail = createAction(CONST.GET_DATA_FAIL)

export const handlePay = createAction(CONST.HANDLE_PAY)
export const handlePaySuccess = createAction(CONST.HANDLE_PAY_SUCCESS)
export const handlePayFail = createAction(CONST.HANDLE_PAY_FAIL)

export const handleTickets = createAction(CONST.HANDLE_TICKET)
export const handleCombo = createAction(CONST.HANDLE_COMBO)
export const handleSeat = createAction(CONST.HANDLE_SEAT)
export const handleBookStep = createAction(CONST.HANDLE_BOOK_STEP)
export const handleRealTimeMap = createAction(CONST.HANDLE_REAL_TIME_MAP)
export const handlePreStep = createAction(CONST.HANDLE_PRE_STEP)
export const getPaymentUrl = createAction(CONST.GET_PAYMENT_URL)
export const getPaymentUrlSuccess = createAction(CONST.GET_PAYMENT_URL_SUCCESS)
