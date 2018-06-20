import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openPopup, acceptRequest, changeState } from '../actions';
import { fetchUsers, confirmTask, fetchMe } from '../data/fetchServer'
import TaskForm from './addTaskForm.js';
import image from '../assets/sample-guy.jpeg'

class JobsForYou extends Component {

  constructor(props) {
    super(props);
    this.state = {showPopup:false,
                  showUserList:"",
                  relevantUserList:[]
                };
    // this.getUsersInterested("id2")
  }

  getUsersInterested = async (taskId) => {
    const userList = [this.props.myRequests[taskId].taskAcceptedById];
    const params ={
      method: 'GET',
      headers:{
        token:window.localStorage.getItem('token')
      }
    };

    fetchUsers(userList)
    .then(users => {
      console.log("users", users);
      this.setState({relevantUserList:users})
    })
  }

  bookUser = (event) => {
    // Change status of the task set in the State
    // this needs to happen in the backend (the database) and then subsequently be updated in the app

    //THIS SHOULD TRIGGER THE PAYMENT FROM ONE USER TO THE OTHER
    const userId = event.target.name;
    const taskId = this.state.showUserList;

    confirmTask(taskId, userId)
    this.props.acceptRequest(userId, taskId);
    this.setState({showUserList:""})
    fetchMe()
    .then(data => {
      this.props.changeState({...data});
    })


    // Close down the popup.
  }

  showUserList = (event) => {
    this.setState({showUserList:event.target.name})

    this.getUsersInterested(event.target.name);
  }


  renderPerson = (elem) => {
    return (
      <div id={elem.userId} className="view-user">
        <div className="user-image"><img src={image} alt="user-pic"/></div>
        <div className="user-info">
          <div className="userName">{elem.firstName}</div>
        </div>
        <button name={elem.userId} onClick = {this.bookUser}>Accept</button>
      </div>
    )
  }

  renderUsersInterested = (taskId) => {
    console.log("relevant users", this.state.relevantUserList);
    return (<div className='popup'>
          <div className = 'popup_inner'>
            {this.state.relevantUserList.map((elem) => {
              return (
                this.renderPerson(elem)
              )
            })}
          </div>
        </div>)
  }



  renderStatusButton (key) {
    const status = this.props.myRequests[key].status;
    let div;
    switch (status) {
      case "Submitted":
        return <div className="status-update">You have submitted this task.</div>
      case "User Requested":
        return (
          <div id={key} className="status-update">You have users interested in this job.
            <button name={key} onClick={this.showUserList}>View Users</button>
            {this.state.showUserList===key?this.renderUsersInterested(key):null}
          </div>
          );
      case "Request Accepted":
        return (<div className="status-update">User has been booked!<button>View User</button></div>);
      default:
        return (<div className="status-update">Invalid request type</div>);
    }
  }

  render() {
    const idList= Object.keys(this.props.myRequests);

    return (
      <div className="my-requests board">
        <ul className="my-request-header">
          <li><h1>Tasks For Them</h1></li>
          <li><a onClick={this.props.openPopup}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></a></li>
          {this.props.showPopup?<TaskForm/>:null}
        </ul>
        {idList.length>0?idList.map((key, index)=>{
          return (
            <div key={index} id={key} className="request-me">
              <div className="request-details">
                <h2>{this.props.myRequests[key].title}</h2>
                <span>Time: {this.props.myRequests[key].time} minute{this.props.myRequests[key].time>1?"s":""}</span>
              </div>
              <div className="request-status">
                {this.renderStatusButton(key)}
              </div>
            </div>
          )
        }):"No outstanding requests"}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  myRequests:state.myRequests,
  showPopup:state.showPopup,
});

const mapDispatchToProps = (dispatch) => ({
  changeState:(obj)=>dispatch(changeState(obj)),
  openPopup:()=>dispatch(openPopup()),
  acceptRequest:(userId, taskId)=>dispatch(acceptRequest(userId, taskId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobsForYou));
