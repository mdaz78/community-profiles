import React, { Component } from 'react';
import Form from '../components/ventures/VentureForm.jsx';
import * as actions from '../actions';

export default class VentureForm extends Component {
  constructor(props) {
    super(props);
    this.suggestTeamMembers = this.suggestTeamMembers.bind(this);
    this.addAsSelectedMember = this.addAsSelectedMember.bind(this);
    this.addNewVenture = this.addNewVenture.bind(this);
  }

  suggestTeamMembers(name) {
    this.props.dispatch(actions.fetchAdminVenturesSuggestedMembers({ name }));
  }

  addAsSelectedMember(id) {
    this.props.dispatch(actions.addMemberToNewVenture(id));
  }

  addNewVenture(data) {
    this.props.dispatch(actions.addNewVenture(data));
    this.context.router.push('/admin/ventures');
  }

  render() {
    return (
      <div className="padding">
        <Form
          suggestTeamMembers={this.suggestTeamMembers}
          addAsSelectedMember={this.addAsSelectedMember}
          newVenture={this.props.admin.ventures.new}
          addNewVenture={this.addNewVenture}
        />
      </div>
    );
  }
}

VentureForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

