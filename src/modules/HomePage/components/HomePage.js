import React, { Component } from 'react';
import Carousel from "./Carousel"
import Moives from "./Movies"

class HomePage extends Component {
      render() {
        return (
          <React.Fragment>
            <div style={{marginTop:"7rem",width:"100%"}}>
              <Carousel {...this.props}/>
            </div>
            <Moives {...this.props}/>
          </React.Fragment>
        );
      }
}
 
export default HomePage;