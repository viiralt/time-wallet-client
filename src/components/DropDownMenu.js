import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DropDownMenu, MenuItem} from 'material-ui/DropDownMenu';

class DropDownOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {value:1};
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value}>
          <MenuItem value={1} primaryText="Distance" />
          <MenuItem value={2} primaryText="User rating" />
          <MenuItem value={3} primaryText="Time"/>
        </DropDownMenu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropDownOptions));
