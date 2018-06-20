import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeState } from '../actions';
import { withRouter } from 'react-router-dom';
import JobsForMe from './JobsForMe';
import JobsForYou from './JobsForYou';
import './Profile.css';



class Profile extends Component {

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  render() {
    return (
      <div className="Profile">
        <h1>Welcome, {this.capitalize(this.props.firstName)}</h1>
        <div className="balance">Your balance is: {this.props.balance} minute{this.props.balance>1?"s":""}</div>
          <div className="userboard">
            <JobsForMe/>
            <JobsForYou/>
        </div>


      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName:state.firstName,
  balance:state.balance,
  myRequests:state.myRequests,
  myJobs:state.myJobs,

});

const mapDispatchToProps = (dispatch) => ({
  changeState:(obj)=>dispatch(changeState(obj))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
