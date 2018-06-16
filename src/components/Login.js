import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeState, setMyAskTasks, setMyDoTasks } from '../actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { fetchMyAskTasks, fetchMyDoTasks, fetchSignIn } from '../data/fetchServer.js';
import './Login.css';


const base64 = require('base-64');


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
    }
  }
  handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value})
  }
  handleSubmit = () => {
    fetchSignIn(this.state.email, this.state.password)
    .then((data) => {
      window.localStorage.setItem("token", data[0])
      this.props.changeState({...data[1], authorized:true})
    })
    // .then(()=> {
    //   fetchMyAskTasks()
    //   .then(data => {
    //     this.props.setMyAskTasks(data)
    //   })
    //   fetchMyDoTasks()
    //   .then(data => {
    //     this.props.setMyDoTasks(data)
    //   })
    // })
  }

  render() {
    const location="/";
    if (this.props.authorized) {
      return (
        <Redirect to='/'/>
      )
    }
    return (
      <div className="Login" location={location}>
        <textarea name="email" onChange={this.handleChange} placeholder="Email"/>
        <textarea name="password"  onChange={this.handleChange} placeholder="Password"/>
        <Link to="/"><button onClick={this.handleSubmit}>Submit</button></Link>
        <Link to="/createUser">Not registered?</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email:state.email,
  password:state.password,
  authorized:state.authorized,
});

const mapDispatchToProps = (dispatch) => ({
  changeState: (obj) => dispatch(changeState(obj)),
  setMyAskTasks: (tasks) => dispatch(setMyAskTasks(tasks)),
  setMyDoTasks: (tasks) => dispatch(setMyDoTasks(tasks)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
