import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownOptions from './DropDownMenu.js';
import { requestToDoTask} from '../data/fetchServer.js';
import './SearchList.css';

class SearchList extends Component {

  constructor(props) {
    super(props)
    this.state ={
      requestedTasks:[],
      redirect: false
    }
  }

  handleResponseClick =  (event) => {
    requestToDoTask(event.target.name, this.props.userId);
    this.setState({requestedTasks: this.state.requestedTasks.concat([event.target.name])})
  }

  renderSearchItem = (key) => {
    const job = this.props.allJobs[key];
    return (
      <div id={job.taskId} className="search-item">
        <div>{this.state.redirect}</div>
          <div className="taskInfo">
          <h1 className="search-title">{job.title}</h1>
          <div className="search-user-ask">{job.userAskName}</div>
          <div className="search-time">{"Time: "+ job.time + " minutes." }</div>
        </div>
          {this.state.requestedTasks.indexOf(key)===-1?<button name={key} className="search-respond" onClick={this.handleResponseClick}>Request this task!</button>:<button>Requested!</button>}
      </div>
    )
  }

  render() {
    const allJobs = Object.keys(this.props.allJobs);
    return (

      <div className="SearchList">
        <h1 className="list-title">List View</h1>
        <div className ="order-list">
          <div className="order-text"><span>Order by: </span></div><MuiThemeProvider><DropDownOptions/></MuiThemeProvider>
        </div>
        {allJobs.map((key, index)=> {
          return this.renderSearchItem(key)}
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allJobs:state.allJobs,
  userId:state.userId,
  name: state.firstName
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchList));
