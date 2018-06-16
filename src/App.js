import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import Dashboard from './components/Dashboard';
import { Route, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { changeState, setMyAskTasks, setMyDoTasks } from './actions';
import { withCookies, Cookies } from 'react-cookie';
import { fetchMyAskTasks, fetchMyDoTasks, fetchMe } from './data/fetchServer.js';

class App extends Component {

  constructor(props) {
    super(props);
    fetchMe()
    .then(data =>{
      if (data.status === 200) {
        this.props.changeState({authorized:true});
        return data.json();
      }
      this.props.changeState({authorized:false});
      return {};
    })
    .then(data => {
      this.props.changeState({...data});
    })
    // .then(()=> {
    //   if (this.props.authorized) {
    //     fetchMyAskTasks()
    //     .then(data => {
    //       this.props.setMyAskTasks(data)
    //     })
    //     fetchMyDoTasks()
    //     .then(data => {
    //       console.log("myDoTasks", data);
    //       this.props.setMyDoTasks(data)
    //     })
    //   }
    // });

  }


  render() {
    return (
      <div className="App">
      <Route path="/" component={Dashboard}/>
      <Route exact={true} path="/login" component={Login}/>
      <Route path="/createUser" component={CreateUser}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  email:state.email,
  authorized:state.authorized,
});

const mapDispatchToProps = (dispatch) => ({
  changeState: (obj) => dispatch(changeState(obj)),
  setMyAskTasks: (tasks) => dispatch(setMyAskTasks(tasks)),
  setMyDoTasks: (tasks) => dispatch(setMyDoTasks(tasks)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
