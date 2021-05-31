import {put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import api from  "../../../services/api"
import * as actions from "../actions"

const baseURL = api.urlFilm
const cinemaURL = api.urlCinema
const showtimesURL = api.urlShowtimes + "/getByDay"

export function* handleGetMoives(){
    try{
        let data = {}
        yield axios({
            method : "get",
            url : baseURL+"/available",
        }).then((res)=>{
            data.movies = res.data
        }).catch(e=>{
            console.log(e)
        })
        yield put(actions.getMoviesSuccess(data))
    }catch(e){
        console.log(e)
    }
}

export function* getMovies(){
    yield takeEvery(actions.getMovies, handleGetMoives)
}

export function* handleGetMoive(action){
    try{
        let data = {}
        yield axios({
            method : "get",
            url : baseURL+"/"+action.payload,
        }).then((res)=>{
            data.movie = res.data
        }).catch(e=>{
            console.log(e)
        })
        yield put(actions.getMovieSuccess(data))
    }catch(e){
        console.log(e)
    }
}

export function* getMovie(){
    yield takeEvery(actions.getMovie, handleGetMoive)
}

export function* handleGetCinema(action){
    try{
        let data = {}
        yield axios({
            method : "get",
            url : cinemaURL,
        }).then((res)=>{
            data.cinema = res.data
        }).catch(e=>{
            console.log(e)
        })
        yield put(actions.getCinemaSuccess(data))
    }catch(e){
        console.log(e)
    }
}

export function* getCinema(){
    yield takeEvery(actions.getCinema, handleGetCinema)
}

export function* handleGetShowtimes(action){
    try{
        let data = {}
        yield axios({
            method : "post",
            headers : {'Content-Type':'application/json'},
            url : showtimesURL,
            data : JSON.stringify({
                ...action.payload
            })
        }).then((res)=>{
            console.log(action.payload)
            data.showtimes = res.data
            // console.log(res.data)
        }).catch(e=>{
            console.log(e)
        })
        yield put(actions.getShowtimesSuccess(data))
    }catch(e){
        console.log(e)
    }
}

export function* getShowtimes(){
    yield takeEvery(actions.getShowtimes, handleGetShowtimes)
}

export default {
    getMovie,
    getCinema,
    getMovies,
    getShowtimes
}