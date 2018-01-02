import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';
import SkillMiniCard from '../components/skills/SkillMiniCard.jsx';

export default class AdminVenturesPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchAdminSkills());
  }

  render() {
    return (
        <div className="margin-top">
          <div className="admin-wrapper">
            <div className="admin-head">
              <Link type="button" to="/admin/skills/new" className="btn">CREATE NEW</Link>
            </div>
            <div className="admin-body">
            {
              this.props.admin.skills.list.map((item, i) => {
                return (
                  <div key={i}>
                    <SkillMiniCard skill={item} currentUser = {this.props.currentUser} />
                  </div>
                );
              })
            }
          </div>
          </div>
        </div>
    );
  }
}

