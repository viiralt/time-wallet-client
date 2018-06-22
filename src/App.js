import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import { Route, withRouter, Switch } from 'react-router-dom';
import { changeState, setMyAskTasks, setMyDoTasks } from './actions';
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
    .then(()=> {
      if (this.props.authorized) {
        fetchMyAskTasks()
        .then(data => {
          this.props.setMyAskTasks(data)
        })
        fetchMyDoTasks()
        .then(data => {
          this.props.setMyDoTasks(data)
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
      <Switch>
      <Route exact={true} path="/" component={Login}/>
      <Route exact={true} path="/createUser" component={CreateUser}/>
      <Route exact={true} path="/:firstName" component={Dashboard}/>
      <Route exact={true} path="/dashboard/search" component={Search}/>
    </Switch>
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
