import React, { Component } from 'react';
import MapContainer from './MapContainer';
import SearchList from './SearchList';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeState, setSearchTasks } from '../actions.js';
import { fetchSearchTasks } from '../data/fetchServer';
import './Search.css';

class Search extends Component {

  constructor (props) {
    super(props);
    this.state = {
      mounted:false,
    }
    fetchSearchTasks()
    .then(tasks => {
      this.props.setSearchTasks(tasks);
        })
  }

  componentDidMount() {
    if (Object.keys(this.props.allJobs).length > 0) {

      this.setState({mounted:true})
    }
  }

  render() {
    if (this.state.mounted) {
      return (
        <div className="Search">
          <div className="forMap"><MapContainer/></div>
          <SearchList/>
          <Link to={`/${this.props.name}`} className="BackToMainPage"><button>Back to Main Page</button></Link>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => ({
  allJobs:state.allJobs,
  name: state.firstName
});

const mapDispatchToProps = (dispatch) => ({
  changeState:(obj)=>dispatch(changeState(obj)),
  setSearchTasks:(tasks)=>dispatch(setSearchTasks(tasks)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
