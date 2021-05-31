import {values} from "lodash/object"
import {fork, all} from "redux-saga/effects"
import { flatten } from 'lodash/array';

import {sagas as HomePage} from "./modules/HomePage"
import {sagas as MovieDetailPage} from "./modules/MovieDetailPage"
import {sagas as MoviesPage} from "./modules/MoviesPage"
import {sagas as BuyTicketPage} from "./modules/BuyTicketPage"
import {sagas as CinemaPage} from "./modules/CinemaPage"
import {sagas as BookTicketPage} from "./modules/BookTicketPage"
import {sagas as WrappedMenu} from "./modules/WrappedMenu"
import {sagas as MemberPage} from "./modules/MemberPage"

const sagasList = [
    HomePage,
    MovieDetailPage,
    MoviesPage,
    BuyTicketPage,
    CinemaPage,
    BookTicketPage,
    WrappedMenu,
    MemberPage
]

export default function* (){
    yield all (flatten(sagasList.map(sagas => values(sagas))).map(saga => fork(saga)));
}