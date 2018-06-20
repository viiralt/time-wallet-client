import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './Navbar.css'
import { withRouter, Link , Redirect} from 'react-router-dom';
import { logoutState } from '../actions.js';


class Navbar extends Component {
  constructor (props) {
      super(props)
      this.state = {
        redirect: false,
      }
}
  handleClick = async (e) => {
    e.preventDefault()
    await window.localStorage.setItem("token", null)
     this.setState({ redirect: (
      <Redirect to="/" > </Redirect>
    )})
    this.props.logoutState();
  }

  render() {
    return (

      <div className="Navbar">
        <div>{this.state.redirect}</div>
        <ul>
          <li><a href=""><i className="fa fa-bars" aria-hidden="true"></i></a></li>
          {/* <li><a className="logout" onClick={this.logout}>Logout</a></li> */}
        <button onClick={(e) => this.handleClick(e)}>LOGOUT</button>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  logoutState:() => dispatch(logoutState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
