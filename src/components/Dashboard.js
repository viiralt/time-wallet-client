import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import './Dashboard.css';
import Profile from './Profile';
import Search from './Search';
import { setMyAskTasks, setMyDoTasks } from '../actions';
import { Route, Redirect, withRouter } from 'react-router-dom';


class Dashboard extends Component {

  constructor (props) {
    super(props);
    if (this.props.authorized) {
      this.getMyAskTasks();
      this.getMyDoTasks();
    }
  }
  getMyAskTasks = () => {
    const params = {
      method:'GET',
      headers:{token:window.localStorage.getItem('token')}
    }
    fetch('http://localhost:3006/myasktasks', params)
    .then(data => data.json())
    .then(data => {
      this.props.setMyAskTasks(data)
    })

  }

  getMyDoTasks = () => {
    const params = {
      method:'GET',
      headers:{token:window.localStorage.getItem('token')}
    }
    fetch('http://localhost:3006/mydotasks', params)
    .then(data => data.json())
    .then(data => {
      this.props.setMyDoTasks(data)
    })
  }

  render() {
    if (this.props.authorized === "") {
      return (
        <div>Pending</div>
      )
    }
    if (this.props.authorized === false) {
      return (
        <Redirect to='/'/>
      )
    }
    return (
      <div className="Dashboard">
        <Navbar/>
        <Route exact={true} path="/:firstName" component={Profile}/>
        <Route exact={true} path="/dashboard/search" component={Search}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorized:state.authorized,
  userId:state.userId,
});

const mapDispatchToProps = (dispatch) => ({
  setMyAskTasks: (tasks) => dispatch(setMyAskTasks(tasks)),
  setMyDoTasks: (tasks) => dispatch(setMyDoTasks(tasks)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
