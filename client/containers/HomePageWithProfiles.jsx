import React, { Component } from 'react';
import Login from '../components/LoginPage.jsx';
import * as actions from '../actions';
import SkillMiniCard from '../components/skills/SkillMiniCard.jsx';
import Spinner from '../components/Spinner.jsx';
import SprintRequest from '../components/home/SprintRequest.jsx';
import SprintForm from '../components/home/SprintForm.jsx';
import EditModal from '../components/home/Editmodal.jsx';
import ProfileListPage from './ProfileListPage.jsx';

export default class HomePageWithProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.props.currentUser ?
          <ProfileListPage {...this.props} />
        :
          <Login />
        }
      </div>
    );
  }
}

