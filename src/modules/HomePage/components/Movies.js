import React, { Component } from 'react';
import FilmComponent from "../../common/filmComponent"
import RankMovies from "./RankMoives"

class Movies extends Component {
      constructor(props){
        super(props)
        this.state = {
          status : true
        }
      }
      render() {
        const {movies, moviesComing} = this.props
        const changeStatusMovie = (status)=>{
          this.setState({
            status : status
          })
        }
        const dislayMovies = (movies)=>{
            
            return movies ? movies.map((movie,index)=>(
                <FilmComponent  history={this.props.history} key={index} {...movie}/>
            ))
            : ""
        }
        return (
          <React.Fragment>
              <div className="container" style={{textAlign:"center"}}>
                  <span className="title-list" style={{fontSize:"2rem",fontWeight:"bold",color:!this.state.status ?"black" : "red"}} onClick={()=>changeStatusMovie(true)}>Phim đang chiếu
                    <div className={!this.state.status ?"line-title" : "line-title-active"}></div>
                  </span>
                  <span className="title-list" style={{fontSize:"2rem",fontWeight:"bold",marginLeft:"2rem",position:"relative",color:this.state.status ?"black" : "red"}} onClick={()=>changeStatusMovie(false)}>
                    Phim sắp chiếu
                    <div className={this.state.status ?"line-title" : "line-title-active"} ></div>
                  </span>
              </div>
              <div className="container" style={{marginTop:"3rem",position:"relative", marginBottom:"10rem",display:this.state.status ? "" : "none"}}>
                <div className="row" style={{width:"100%"}}>
                    {dislayMovies(movies)}
                </div>
                <button onClick={()=>this.props.history.push("/film/showing")} variant="contained" className="btn-see-more"  >
                      Xem Thêm <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="container" style={{marginTop:"3rem", marginBottom:"10rem",position:"relative",display:!this.state.status ? "" : "none"}}>
                <div className="row" style={{width:"100%"}}>
                    {dislayMovies(moviesComing)}
                </div>
                <button onClick={()=>this.props.history.push("/film/coming")} variant="contained" className="btn-see-more" >
                      Xem Thêm <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div>
                <RankMovies {...this.props}/>
              </div>
          </React.Fragment>
        );
      }
}
 
export default Movies;