import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { name } from "../reducers"
import * as action from "../actions"
import * as actionWrappedMenu from "../../WrappedMenu/actions"
import BookTicketPage from "./BookTicketPage"

class BookTicketPagePageContainer extends Component {
    componentDidMount() {
        this.props.actions.getData(this.props.match.params.id)
        this.props.actions.handleBookStep(1)
        // console.log()
    }
    render() {
        return (
            <React.Fragment>
                <BookTicketPage {...this.props} />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state[name]
    }
}
function mapDispatchToProps(dispatch) {
    const actions = {
        ...action,
        ...actionWrappedMenu
    }
    return { actions: bindActionCreators(actions, dispatch) }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BookTicketPagePageContainer)
);