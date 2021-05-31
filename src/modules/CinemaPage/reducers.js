import freeze from "deep-freeze"
import { handleActions } from "redux-actions"
import * as actions from "./actions"

export const name = "CinemaPage"

const intialState = freeze({
})

export default handleActions({
    [actions.getMovieSuccess]:(state,action)=>{
        return freeze({
            ...state,
            movies : action.payload.movies
        })
    },
    [actions.getCinemaSuccess]:(state,action)=>{
        return freeze({
            ...state,
            cinema : action.payload.cinema
        })
    },
    [actions.getShowtimesSuccess]:(state,action)=>{
        return freeze({
            ...state,
            showtimes : action.payload.showtimes
        })
    }
},
    intialState
)