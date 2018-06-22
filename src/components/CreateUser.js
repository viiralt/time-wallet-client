import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './CreateUser.css';
import { changeState, setMyAskTasks, setMyDoTasks } from '../actions';
class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      firstName:"",
      lastName:"",
      password:"",
      location: ""
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async (event) => {
    await fetch('http://localhost:3006/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        })

    })
  this.setState({location: (
    <Redirect to='/'/>
  )})
  }


  render() {

    return (
      <div>
      <div>{this.state.location}></div>
     <div className='popup'>

      <form onSubmit={this.handleSubmit} className = 'createUser'>
        <label>
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          First Name:
          <input name="firstName" type="text" value={this.state.firsName} onChange={this.handleChange} />
        </label>
        <label>
          Last Name:
          <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUser));
