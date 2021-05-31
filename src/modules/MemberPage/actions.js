import {createAction} from "redux-actions"
import * as CONST from "./constants"

export const getTickets = createAction(CONST.GET_TICKETS)
export const getTicketsSuccess = createAction(CONST.GET_TICKETS_SUCCESS)
export const getTicketsFail = createAction(CONST.GET_TICKETS_FAIL)

export const saveInfo = createAction(CONST.SAVE_INFO)
export const saveInfoSuccess = createAction(CONST.SAVE_INFO_SUCCESS)
export const saveInfoFail = createAction(CONST.SAVE_INFO_FAIL)

export const getShowtimes = createAction(CONST.GET_SHOWTIMES)
export const getShowtimesSuccess = createAction(CONST.GET_SHOWTIMES_SUCCESS)
export const getShowtimesFail = createAction(CONST.GET_SHOWTIMES_FAIL)

export const handleChangeText = createAction(CONST.HANDLECHANGETEXT)
export const handleChangeDate = createAction(CONST.HANDLECHANGEDATE)
export const handleDialog = createAction(CONST.HANDLEDIALOG)

export const handleInitData = createAction(CONST.HANDLE_INIT_DATA)
export const handleInitDataSuccess = createAction(CONST.HANDLE_INIT_DATA_SUCCESS)
export const handleInitDataFail = createAction(CONST.HANDLE_INIT_DATA_FAIL)