import React, { Component } from 'react';
import Header from './Header.jsx';
import WritePost from './WritePost.jsx';
import PostView from './PostView.jsx';
import PeopleWidget from '../components/skills/PeopleWidget.jsx';
import Spinner from '../components/Spinner.jsx';
import * as actions from '../actions';
import  { Link } from 'react-router';

export default class SkillDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.getSkillDetails(this.props.params.slug));
  }

  deleteSkill(e) {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this skill?')){
      return;
    }
    let skill = this.props.skills.details.info;
    fetch('/api/skills/delete/'+skill.slug, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    }).then((response) => {
      window.location = '/skills';
    });
  }

  render() {
    let skill = this.props.skills.details.info;
    return (
      <div className="skill-page">
        {
          this.props.skills.details.loading ?
          <Spinner />
          :
          <div>
            <div className="skills">
              <div className="container margin-top">
                <div className="col-md-10 col-md-offset-1">
                  <div className="single-shot">
                    <img src={skill.logo || "/images/React.js.png"} className="img-responsive" alt="" />
                  </div>
                  <h1 className="text-center">{skill.name}</h1>
                  <p>{skill.description}</p>
                  <div className="skill-edit-del">
                    {(this.props.currentUser && this.props.currentUser.admin) ?
                    <Link to={"/skills/edit/"+skill.slug}>
                      <span className="glyphicon glyphicon-pencil" aria-hidden="true"/>
                    </Link>
                    : null}
                    {(this.props.currentUser && this.props.currentUser.admin) ?
                      <span className="glyphicon glyphicon-trash" onClick={this.deleteSkill} aria-hidden="true"/>
                    : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="col-md-10 col-md-offset-1">
                <PeopleWidget skill={skill} />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

