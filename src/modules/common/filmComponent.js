import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import api from '../../services/api'
import { Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import DialogLoading from "./loadingDialog"

class FilmComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      openLoading : false
    }
  }
  render() {
    const { img1, name, _id } = this.props
    const moveToFilm = (id) => {
      this.setState({openLoading:true})
      this.props.history.push("/film-detail/" + id)
    }
    return (
      <React.Fragment>
        <DialogLoading open={this.state.openLoading}/>
        
        <div className="col-6 col-sm-4 col-md-3" style={{ marginBottom: "5rem", textAlign: "center" }}>
          {this.state.loaded ? "" : <Skeleton variant="rect" className="film-component-skeleton" style={{ position: "absolute", left:"4rem" }} />}
          <img className="film-component" alt={name + " img"} src={api.urlImg + img1} onLoad={e => this.setState({ loaded: true })} />
          <Link className="bg-film-component" to={"/film-detail/" + _id}>
            <Button className="button-film-component" variant="contained" >
              Mua Vé
                    </Button>
          </Link>
          <p onClick={() => { moveToFilm(_id) }} className="title-film-component">{name}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default FilmComponent;