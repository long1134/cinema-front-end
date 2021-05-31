import {createAction} from "redux-actions"
import * as CONST from "./constants"

export const getMovies = createAction(CONST.GET_MOVIES)
export const getMoviesSuccess = createAction(CONST.GET_MOVIES_SUCCESS)
export const getMoviesFail = createAction(CONST.GET_MOVIES_FAIL)