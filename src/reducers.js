import {combineReducers} from "redux"
import {connectRouter} from "connected-react-router"
import HomePage,{name as nameOfHomePage} from "./modules/HomePage"
import MovieDetailPage,{name as nameOfMovieDetailPage} from "./modules/MovieDetailPage"
import MoviesPage,{name as nameOfMoviesPage} from "./modules/MoviesPage"
import BuyTicketPage,{name as nameOfBuyTicketPage} from "./modules/BuyTicketPage"
import CinemaPage,{name as nameOfCinemaPage} from "./modules/CinemaPage"
import BookTicketPage,{name as nameOfBookTicketPage} from "./modules/BookTicketPage"
import WrappedMenu,{name as nameOfWrappedMenu} from "./modules/WrappedMenu"
import MemberPage,{name as nameOfMemberPage} from "./modules/MemberPage"

const reducers = {
    [nameOfHomePage]:HomePage,
    [nameOfMovieDetailPage]:MovieDetailPage,
    [nameOfMoviesPage]:MoviesPage,
    [nameOfBuyTicketPage]:BuyTicketPage,
    [nameOfCinemaPage]:CinemaPage,
    [nameOfBookTicketPage]:BookTicketPage,
    [nameOfWrappedMenu]:WrappedMenu,
    [nameOfMemberPage]:MemberPage,
}

export default (history) => combineReducers({
    ...reducers,
    router : connectRouter(history)
})