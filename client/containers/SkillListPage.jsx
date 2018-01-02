import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';
import SkillMiniCard from '../components/skills/SkillMiniCard.jsx';
import Spinner from '../components/Spinner.jsx';

export default class SkillListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchSkills());
  }

  render() {
    return (
      <div className="margin-top wrapper">
        <div className="row">
          {this.props.skills.list.loading ?
            <Spinner />
            :
            <div>
              {this.props.skills.list.info.length > 0 ?
                this.props.skills.list.info.map((item, i) => {
                  return (
                    <div key={i}>
                      <SkillMiniCard skill={item} currentUser={this.props.currentUser} />
                    </div>
                  );
                })
                :
                <div className="text-center">No Skills Listed.</div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

