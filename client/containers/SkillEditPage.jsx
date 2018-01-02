import React, { Component } from 'react';
import Form from '../components/skills/SkillForm.jsx';
import Spinner from '../components/Spinner.jsx';
import * as actions from '../actions';

export default class SkillEditPage extends Component {
  constructor(props) {
    super(props);
    this.updateSkill = this.updateSkill.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.getSkillDetails(this.props.params.slug));
  }

  updateSkill(data) {
    this.props.dispatch(actions.updateSkill(this.props.params.slug, data)).then(() => {
      this.context.router.push('/skills/'+ this.props.params.slug)
    });
  }

  render() {
    let skill = this.props.skills.details.info;

    return (
      <div className="">
        <div className="container">
          <div className="row">
            {this.props.skills.details.loading ? 
              <Spinner />
            :
              <Form
                skill={skill}
                edit={true}
                updateSkill = {this.updateSkill}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

SkillEditPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

