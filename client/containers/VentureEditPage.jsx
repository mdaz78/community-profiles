import React, { Component } from 'react';
import Form from '../components/ventures/VentureForm.jsx';
import Spinner from '../components/Spinner.jsx';
import * as actions from '../actions';

export default class VentureEditPage extends Component {
  constructor(props) {
    super(props);
    this.suggestTeamMembers = this.suggestTeamMembers.bind(this);
    this.addAsSelectedMember = this.addAsSelectedMember.bind(this);
    this.updateVenture = this.updateVenture.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.getVentureDetails(this.props.params.slug));
  }

  suggestTeamMembers(name) {
    this.props.dispatch(actions.fetchVenturesSuggestedMembers({ name }));
  }

  addAsSelectedMember(data) {
    this.props.dispatch(actions.updateMemberInEditVenture(data));
  }

  updateVenture(data) {
    this.props.dispatch(actions.updateVenture(this.props.params.slug, data)).then(() => {
      window.location = ('/ventures/'+ this.props.params.slug);
    });
  }

  render() {
    let venture = this.props.ventures.details.info;
    if(venture) {
      venture.suggestedMembers && venture.suggestedMembers.length > 0 ? venture : venture.suggestedMembers = [];
    }
    return (
      <div className="">
        <div className="container padding-0">
          <div className="row">
            {this.props.ventures.details.loading ? 
              <Spinner />
            :
              <Form
                suggestTeamMembers={this.suggestTeamMembers}
                addAsSelectedMember={this.addAsSelectedMember}
                newVenture={venture}
                edit={true}
                updateVenture = {this.updateVenture}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

VentureEditPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

