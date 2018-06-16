import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './addTaskForm.css';
import { closePopup, addRequest, setMyAskTasks } from '../actions.js';
import { fetchPostTask, fetchMyAskTasks } from '../data/fetchServer'
class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description:'',
      time:''
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    const newTask= {
      ...this.state,
      userAsk: this.props.userId,
      userAskName: this.props.firstname,
      picture:this.props.picture,
      status:"Submitted"
    }
    newTask.time = Number(newTask.time);

    fetchPostTask(newTask);
    // fetchMyAskTasks()
    // .then(tasks => {
    //   this.props.setMyAskTasks(tasks)
    // })
    //
    // this.props.closePopup();
    // // this.props.addRequest(newRequest);
    // event.preventDefault();
  }

  render() {
    return (
    <div className='popup'>
      <form onSubmit={this.handleSubmit} className = 'popup_inner'>
        <label>
          Title:
          <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label>
          Description:
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
        </label>
        <label>
          Time (minutes):
          <input name="time" type="text" value={this.state.time} onChange={this.handleChange} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskForm));
