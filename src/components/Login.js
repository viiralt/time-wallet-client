import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeState, setMyAskTasks, setMyDoTasks } from '../actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { fetchMyAskTasks, fetchMyDoTasks, fetchSignIn } from '../data/fetchServer.js';
import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      location: false

    }

  }
  handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value})
  }
  handleSubmit =  async () => {
    await fetchSignIn(this.state.email, this.state.password)
        .then((data) => {
      window.localStorage.setItem("token", data[0])
      this.props.changeState({...data[1], authorized:true})
    })
    await (()=> {
      fetchMyAskTasks()

      .then(data => {
        this.props.setMyAskTasks(data)
      })
      fetchMyDoTasks()
      .then(data => {
        this.props.setMyDoTasks(data)
      })

    })
     this.setState({location: <Redirect to={`/${this.props.name}`}/>})
  }

  render() {
    // let location = "";
    //
    // if (this.props.authorized) {
    //   location =  (
    //     <Redirect to={`/${this.state.email}`}/>
    //   )
    // }
    return (
      <div className="Login" >
        <div>{this.state.location}</div>
        <textarea name="email" onChange={this.handleChange} placeholder="Email"/>
        <textarea name="password"  onChange={this.handleChange} placeholder="Password"/>
        <button onClick={this.handleSubmit}>Submit</button>
        <Link  to="/createUser">Not registered?</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email:state.email,
  password:state.password,
  authorized:state.authorized,
  name: state.firstName
});

const mapDispatchToProps = (dispatch) => ({
  changeState: (obj) => dispatch(changeState(obj)),
  setMyAskTasks: (tasks) => dispatch(setMyAskTasks(tasks)),
  setMyDoTasks: (tasks) => dispatch(setMyDoTasks(tasks)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
