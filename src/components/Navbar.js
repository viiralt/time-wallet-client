import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './Navbar.css'
import { withRouter } from 'react-router-dom';
import { logoutState } from '../actions.js';

class Navbar extends Component {

  logout = () => {
    window.localStorage.setItem("token", null)
    this.props.logoutState();
  }

  render() {
    return (
      <div className="Navbar">
        <ul>
          <li><a href=""><i className="fa fa-bars" aria-hidden="true"></i></a></li>
          <li><a className="logout" onClick={this.logout}>Logout</a></li>
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
