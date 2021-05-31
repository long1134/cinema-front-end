import React, { Component } from 'react';
import InfoMember from "./InfoMember"
import InfoTickets from "./InfoTickets"

class MemberPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: true
    }
  }
  componentDidMount() {
    this.props.actions.getTickets()
  }
  render() {
    const changeStatusMovie = (status) => {
      this.setState({
        status: status
      })
    }
    return (
      <React.Fragment>
        <div style={{ width: "100%" }}>
          <div className="container" style={{ marginTop: "10rem" }}>
            <span className="title-list" style={{ fontSize: "2rem", fontWeight: "bold", color: !this.state.status ? "black" : "red" }} onClick={() => changeStatusMovie(true)}>Thông tin member
                      <div className={!this.state.status ? "line-title" : "line-title-active"}></div>
            </span>
            <span className="title-list" style={{ fontSize: "2rem", fontWeight: "bold", marginLeft: "2rem", position: "relative", color: this.state.status ? "black" : "red" }} onClick={() => changeStatusMovie(false)}>
              Thông tin vé
              <div className={this.state.status ? "line-title" : "line-title-active"} ></div>
            </span>
          </div>
          {this.state.status ? 
          <InfoMember {...this.props} />:
          <InfoTickets {...this.props} />}
        </div>
      </React.Fragment>
    );
  }
}

export default MemberPage;