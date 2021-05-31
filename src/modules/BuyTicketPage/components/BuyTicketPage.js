import React, { Component } from 'react';
import FilmDetail from "./FilmDetail"

class BuyTicketPage extends Component {
  render() {
    console.log(this.props)
    return  (
      <React.Fragment>
        <div style={{width:"100%"}}>
          <FilmDetail {...this.props}/>
        </div>
      </React.Fragment>
    );
  }
}

export default BuyTicketPage;