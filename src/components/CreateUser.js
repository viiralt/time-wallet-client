import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './CreateUser.css';
import { closePopup, addRequest, setMyAskTasks } from '../actions.js';
import { fetchPostTask, fetchMyAskTasks } from '../data/fetchServer'
class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description:'',
      time:''
    };
  }

  // handleChange = (event) => {
  //   this.setState({[event.target.name]: event.target.value});
  // }

  // fetch(`http://localhost:3000/events`, {
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type':'application/json'
  //   },
  //   method: 'POST',
  //   body: JSON.stringify({title: a, date: b, venue: c})
  //
  // })

  handleSubmit = (event) => {
    fetch(`http://localhost:3006/createUser`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: event.target.email,
        firstName: event.target.firstName,
        lastName: event.target.lastName,
        password: event.target.password,
        })

    })
  }
  //   const newTask= {
  //     ...this.state,
  //     userAsk: this.props.userId,
  //     userAskName: this.props.firstname,
  //     picture:this.props.picture,
  //     status:"Submitted"
  //   }
  //   newTask.time = Number(newTask.time);
  //
  //   fetchPostTask(newTask);
  //   fetchMyAskTasks()
  //   .then(tasks => {
  //     this.props.setMyAskTasks(tasks)
  //   })
  //
  //   this.props.closePopup();
  //   // this.props.addRequest(newRequest);
  //   event.preventDefault();
  // }

  render() {
    return (

    <div className='popup'>

      <form onSubmit={this.handleSubmit} className = 'popup_inner'>
        <label>
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          First Name:
          <input name="firsName" type="text" value={this.state.firsname} onChange={this.handleChange} />
        </label>
        <label>
          Last Name:
          <input name="lastName" type="text" value={this.state.lastname} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
    );
  }
}


const mapStateToProps = (state) => ({
  userId: state.userId,
  myRequests: state.myRequests,
  picture: state.picture,
  firstname:state.firstname,
});

const mapDispatchToProps = (dispatch) => ({
  closePopup:()=>dispatch(closePopup()),
  // addRequest:(req)=>dispatch(addRequest(req))
  setMyAskTasks:(tasks) => dispatch(setMyAskTasks(tasks))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUser));
