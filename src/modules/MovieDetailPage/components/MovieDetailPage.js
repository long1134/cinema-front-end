import React, { Component } from 'react';
import FilmDetail from "./FilmDetail"

class MovieDetailPage extends Component {
  render() {
    return  (
      <React.Fragment>
        <div style={{marginTop:"7rem",width:"100%"}}>
          <FilmDetail {...this.props}/>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieDetailPage;