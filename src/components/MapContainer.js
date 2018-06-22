import React from 'react';
import { connect } from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './MapContainer.css';
// ...

class MapContainer extends React.Component {

  onMarkerClick (props, marker, e) {
    console.log('marker', props)
  }

  render() {
    const jobKeys = Object.keys(this.props.allJobs);
    return (
      <div className="MapContainer">
        <h1>Map View</h1>
        <Map
          style={{width:700, height:600, position:"absolute", top:500, left:400}}
          google={this.props.google}
          zoom={14}
          initialCenter={this.props.location}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}
                //  position={this.props.location}
                  color={'blue'}/>
          {jobKeys.map((key, index)=> {
            return (
              <Marker onClick={this.onMarkerClick}
                      name={this.props.allJobs[key].taskName}
                    //  position={this.props.allJobs[key].location}
                      styles={{color:'blue'}}
                      key={index}/>
            );
          })}
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>Hello</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>)
    }
}

const mapStateToProps = (state) => ({
  location:state.location,
  allJobs:state.allJobs,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: "AIzaSyAihUaEvx5FjpJedWt9Lxw0zJLLcib9888"
})(MapContainer))
