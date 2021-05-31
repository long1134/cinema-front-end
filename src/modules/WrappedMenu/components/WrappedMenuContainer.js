import React, { Component } from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {name} from "../reducers"
import * as action from "../actions"
import WrappedMenu from "./WrappedMenu"

class WrappedMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <React.Fragment>
                <WrappedMenu {...this.props}/>
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
    )(WrappedMenuContainer)
) ;