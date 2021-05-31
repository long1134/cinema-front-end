import React, { Component } from "react"

import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { Route, Switch } from "react-router-dom"

import "./assets/css/nucleo-icons.css"
import "./assets/scss/blk-design-system-react.scss"
import "./assets/demo/demo.css"

import configureStore from "./stores"

import WrappedMenuContainer from "./modules/WrappedMenu/components/WrappedMenuContainer"
import HomePage from "./modules/HomePage/components/HomePageContainer"
import MovieDetailPage from "./modules/MovieDetailPage/components/MovieDetailPageContainer"
import MoviesPage from "./modules/MoviesPage/components/MoviesPageContainer"
import BuyTicketPage from "./modules/BuyTicketPage/components/BuyTicketPageContainer"
import CinemaPage from "./modules/CinemaPage/components/CinemaPageContainer"
import BookTicket from "./modules/BookTicketPage/components/BookTicketPageContainer"
import MemberPage from "./modules/MemberPage/components/MemberPageContainer"
import BookingFinalPage from "./modules/BookTicketPage/components/BookingFinalPage"

const { store, history } = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <WrappedMenuContainer>
              <Route path='/' exact component={HomePage} />
              <Route path='/film-detail/:id' component={MovieDetailPage} />
              <Route path='/ticket' component={BuyTicketPage} />
              <Route path='/cinema' component={CinemaPage} />
              <Route path='/book-ticket/:id' component={BookTicket} />
              <Route path='/member' component={MemberPage} />
              <Route path='/thanks' component={BookingFinalPage} />
              <Switch>
                <Route path='/film' component={MoviesPage} />
                <Route path='/film/:id' component={MoviesPage} />
              </Switch>
            </WrappedMenuContainer>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
