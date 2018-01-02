import React, { Component } from 'react';
import * as actions from '../actions';
import Spinner from '../components/Spinner.jsx';

export default class AdminStatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchAdminStats());
  }

  render() {
    return (
      <div className="admin-stats-page margin-top">
        {!this.props.admin.stats.loading ?
          <div className="admin-wrapper">
            <div className="col-md-4 ">
              <div className="stats-card">
                <h1>Ventures</h1>
                <h2>{this.props.admin.stats.info.ventures}</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card">
                <h1>People</h1>
                <h2>{this.props.admin.stats.info.users}</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card">
                <h1>Skills</h1>
                <h2>{this.props.admin.stats.info.skills}</h2>
              </div>
            </div>
          </div>
        :
          <Spinner />
        }
      </div>
    );
  }
}

