import React, { Component } from 'react';
import Form from '../components/skills/SkillForm.jsx';
import * as actions from '../actions';

export default class SkillForm extends Component {
  constructor(props) {
    super(props);
    this.addNewSkill = this.addNewSkill.bind(this);
  }

  addNewSkill(data) {
    this.props.dispatch(actions.addNewSkill(data)).then(() => {
      this.context.router.push('/admin/skills');
    });
  }

  render() {
    return (
      <div className="">
        <Form
          addNewSkill={this.addNewSkill}
        />
      </div>
    );
  }
}

SkillForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
