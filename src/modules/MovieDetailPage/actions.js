import {createAction} from "redux-actions"
import * as CONST from "./constants"

export const getMovie = createAction(CONST.GET_MOVIE)
export const getMovieSuccess = createAction(CONST.GET_MOVIE_SUCCESS)
export const getMovieFail = createAction(CONST.GET_MOVIE_FAIL)

export const getMovies = createAction(CONST.GET_MOVIES)
export const getMoviesSuccess = createAction(CONST.GET_MOVIES_SUCCESS)
export const getMoviesFail = createAction(CONST.GET_MOVIES_FAIL)

export const getCinema = createAction(CONST.GET_CINEMA)
export const getCinemaSuccess = createAction(CONST.GET_CINEMA_SUCCESS)
export const getCinemaFail = createAction(CONST.GET_CINEMA_FAIL)

export const getShowtimes = createAction(CONST.GET_SHOWTIMES)
export const getShowtimesSuccess = createAction(CONST.GET_SHOWTIMES_SUCCESS)
export const getShowtimesFail = createAction(CONST.GET_SHOWTIMES_FAIL)