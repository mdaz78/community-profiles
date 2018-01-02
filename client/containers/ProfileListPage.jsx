import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';
import ProfileMiniCard from '../components/profiles/ProfileMiniCard.jsx';
import Spinner from '../components/Spinner.jsx';

export default class ProfileListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchProfiles());
  }

  render() {
    return (
      <div className="margin-top wrapper">
        <div className="row">
          {this.props.profiles.list.loading ?
            <Spinner />
            :
            <div className="profile-list">
              {
                this.props.profiles.list.info.length > 0 ?

                this.props.profiles.list.info.map((item, i) => {
                  return (
                    <div className="profile-card" key={i}>
                      <ProfileMiniCard profile={item} currentUser={this.props.currentUser} />
                    </div>

                  );
                })
                :
                <div className="col-sm-12 col-md-12 text-center"></div>
              }
              <div className="clearfix"/>
            </div>
          }
        </div>
      </div>
    );
  }
}

