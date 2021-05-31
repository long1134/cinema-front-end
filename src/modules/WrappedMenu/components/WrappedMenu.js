import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import logo from "../../../assets/img/Logo_cinema.png"
import DialogForm from "./dialogFormComponent"
import DialogLoading from "../../common/loadingDialog"

class WrappedMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapseOpen: false,
          color: "",
          openForm : false,
          openLoading:false
        };
      }
      componentDidMount() {
        window.addEventListener("scroll", this.changeColor);
      }
      componentWillUnmount() {
        window.removeEventListener("scroll", this.changeColor);
      }
      changeColor = () => {
        if (
          document.documentElement.scrollTop > 99 ||
          document.body.scrollTop > 99
        ) {
          this.setState({
            color: "bg-info"
          });
        } else if (
          document.documentElement.scrollTop < 100 ||
          document.body.scrollTop < 100
        ) {
          this.setState({
            color: "navbar-transparent"
          });
        }
      };
      toggleCollapse = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({
          collapseOpen: !this.state.collapseOpen
        });
      };
      onCollapseExiting = () => {
        this.setState({
          collapseOut: "collapsing-out"
        });
      };
      onCollapseExited = () => {
        this.setState({
          collapseOut: ""
        });
      };
      scrollToDownload = () => {
        document
          .getElementById("download-section")
          .scrollIntoView({ behavior: "smooth" });
      };
      openLoading=()=>{
        this.setState({openLoading:true})
      }
      render() {
        // console.log(this.props.location.pathname.substring(0,5))
        return (
          <React.Fragment>
            <DialogLoading open={this.state.openLoading}/>
          <Navbar
            className={"fixed-top "}
            color-on-scroll="100"
            expand="lg"
            style={{backgroundColor:"black",height:"7rem"}}
          >
            <Container>
              <div className="navbar-translate">
                <NavbarBrand
                  data-placement="bottom"
                  to="/"
                  rel="noopener noreferrer"
                  title="Designed and Coded by Creative Tim"
                  tag={Link}
                >
                  <img src={logo} alt="logo" style={{width:"150px"}}/>
                </NavbarBrand>
                <button
                  aria-expanded={this.state.collapseOpen}
                  className="navbar-toggler navbar-toggler"
                  onClick={this.toggleCollapse}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <Collapse
                className={"justify-content-end " + this.state.collapseOut + " pr-5"}
                navbar
                isOpen={this.state.collapseOpen}
                onExiting={this.onCollapseExiting}
                onExited={this.onCollapseExited}
              >
              
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={logo} alt="logo" style={{width:"150px"}}
                        onClick={()=>this.openLoading()}/>
                      </a>
                    </Col>
                    <Col className="collapse-close text-right" xs="6">
                      <button
                        aria-expanded={this.state.collapseOpen}
                        className="navbar-toggler"
                        onClick={this.toggleCollapse}
                      >
                        <i className="tim-icons icon-simple-remove" />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav navbar
                className="ml-5"
                >
                  <NavItem className={this.props.location.pathname === "/" ? "pr-4 menu-item-active" : "pr-4 menu-item"} >
                    <NavLink
                      data-placement="bottom"
                      href="/"
                      rel="noopener noreferrer"
                      title="Follow us on Twitter"
                      onClick={()=>this.openLoading()}
                    >
                      <p >Trang chủ</p>
                    </NavLink>
                  </NavItem>
                  <NavItem className={this.props.location.pathname.substring(0,5) === "/film" || this.props.location.pathname.substring(0,7) === "/dat-ve" || this.props.location.pathname.substring(0,12) === "/book-ticket" ? "pr-4 menu-item-active" : "pr-4 menu-item"}>
                    <NavLink
                      data-placement="bottom"
                      href="/film"
                      rel="noopener noreferrer"
                      title="Like us on Facebook"
                      onClick={()=>this.openLoading()}
                    >
                      <p>Phim</p>
                    </NavLink>
                  </NavItem>
                  <NavItem className={this.props.location.pathname === "/ticket" ? "pr-4 menu-item-active" : "pr-4 menu-item"}>
                    <NavLink
                      data-placement="bottom"
                      href="/ticket"
                      rel="noopener noreferrer"
                      title="Follow us on Instagram"
                      onClick={()=>this.openLoading()}
                    >
                      <p >Mua vé</p>
                    </NavLink>
                  </NavItem>
                  <NavItem className={this.props.location.pathname === "/member" ? "pr-4 menu-item-active" : "pr-4 menu-item"}>
                    <NavLink
                      data-placement="bottom"
                      href="/member"
                      rel="noopener noreferrer"
                      title="Follow us on Instagram"
                      onClick={()=>this.openLoading()}
                    >
                      <p >Thành viên</p>
                    </NavLink>
                  </NavItem>
                  <NavItem className={this.props.location.pathname === "/cinema" ? "pr-4 menu-item-active" : "pr-4 menu-item"}>
                    <NavLink
                      data-placement="bottom"
                      href="/cinema"
                      rel="noopener noreferrer"
                      title="Follow us on Instagram"
                      onClick={()=>this.openLoading()}
                    >
                      <p >Rạp chiếu phim</p>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
            <div>
              <DialogForm openForm={this.state.openForm} {...this.props} /></div>
          </Navbar>
          <div>
            {this.props.children}
          </div>
          </React.Fragment>
        );
      }
}
 
export default WrappedMenu;