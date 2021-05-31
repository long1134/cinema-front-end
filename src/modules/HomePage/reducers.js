import freeze from "deep-freeze"
import { handleActions } from "redux-actions"
import * as actions from "./actions"

export const name = "HomePage"

const intialState = freeze({
    movies : []
})

export default handleActions({
    [actions.getMoviesSuccess]:(state,action)=>{
        return freeze({
            ...state,
            movies : action.payload.movies,
            moviesComing : action.payload.moviesComing,
        })
    }
},
    intialState
)