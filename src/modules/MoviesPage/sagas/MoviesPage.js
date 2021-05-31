import { put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import * as actions from "../actions"

const baseURL = "http://long-cinema-app.herokuapp.com/api/quest/film"

export function* handleGetMoives() {
    try {
        let data = {}
        yield axios({
            method: "get",
            url: baseURL + "/available"
        }).then((res) => {
            data.movies = res.data
        }).catch(e => {
            console.log(e)
        })
        yield axios({
            method: "get",
            url: baseURL + "/coming"
        }).then((res) => {
            data.moviesComing = res.data
        }).catch(e => {
            console.log(e)
        })
        yield put(actions.getMoviesSuccess(data))
    } catch (e) {
        console.log(e)
    }
}

export function* getMovies() {
    yield takeEvery(actions.getMovies, handleGetMoives)
}

export default {
    getMovies
}