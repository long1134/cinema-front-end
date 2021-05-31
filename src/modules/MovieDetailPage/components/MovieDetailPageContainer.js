import React, { Component } from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {name} from "../reducers"
import * as action from "../actions"
import MovieDetailPage from "./MovieDetailPage"
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class MovieDetailPageContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : this.props.match.params.id
        }
    }
    componentDidMount() {
        this.props.actions.getMovie(this.props.match.params.id)
        this.props.actions.getCinema()
        this.props.actions.getMovies()
    }
    render() {
        if(this.state.id !== this.props.match.params.id){
            this.setState({
                id : this.props.match.params.id
            })
            this.props.actions.getMovie(this.props.match.params.id)
            this.props.actions.getCinema()
            this.props.actions.getMovies()
            scroll.scrollToTop({
                duration:0
            });
            console.log("check")
        }
        return (  
            <React.Fragment>
                <MovieDetailPage {...this.props}/>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state){
    return{
        ...state[name]
    }
}
function mapDispatchToProps(dispatch){
    const actions = {
        ...action
    }
    return {actions : bindActionCreators(actions,dispatch)}
}
 
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MovieDetailPageContainer)
) ;