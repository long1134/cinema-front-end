import React, { Component } from 'react';
import FilmDetail from "./FilmDetail"

class CinemaPage extends Component {
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

export default CinemaPage;