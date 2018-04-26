import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeState } from '../actions';
import { Link, withRouter } from 'react-router-dom';
const base64 = require('base-64');

class JobsForMe extends Component {

  constructor (props) {
    super(props);
    const params ={
      method: 'POST',
      headers:{
        token:window.localStorage.getItem('token')
      }
    };
  }

  renderStatusButton (key) {
    const status = this.props.myJobs[key].status
    let div;
    switch (status) {
      case "User Requested":
        return (<div className="status-update">You have requested this job. Pending response.</div>);
      case "Request Accepted":
        return (<div className="status-update">You have been booked!</div>);
      default:
        return (<div className="status-update">Invalid request type</div>);
    }
  }

  render() {
    const idList= Object.keys(this.props.myJobs);
    return (
      <div className="my-jobs board">
        <ul className="my-jobs-header">
          <li><h1>Tasks For Me</h1></li>
          <li><Link to="/dashboard/search"><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></Link></li>
        </ul>
        {idList.length>0?idList.map((key)=>{
          return (
            <div id={key} className="request-me">
              <div className="request-details">
                <h2>{this.props.myJobs[key].title}</h2>
                <span>Time: {this.props.myJobs[key].time} minute{this.props.myJobs[key].time>1?"s":""}</span>
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
  myJobs:state.myJobs,
});

const mapDispatchToProps = (dispatch) => ({
  changeState:(obj)=>dispatch(changeState(obj))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobsForMe));
