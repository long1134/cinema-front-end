import freeze from "deep-freeze"
import { handleActions } from "redux-actions"
import * as actions from "./actions"

export const name = "MoviesPage"

const intialState = freeze({
})

export default handleActions({
    [actions.getMoviesSuccess]:(state,action)=>{
        return freeze({
            ...state,
            movies : action.payload.movies,
            moviesComing : action.payload.moviesComing
        })
    }
},
    intialState
)