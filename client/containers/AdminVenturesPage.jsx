import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';
import VentureMiniCard from '../components/ventures/VentureMiniCard.jsx';

export default class AdminVenturesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchAdminVentures());
  }

  render() {
    return (
        <div className="add-venture margin-top">
          <div className="admin-wrapper">
            <div className="admin-head">
              <Link type="button" to="/admin/ventures/new" className="btn">CREATE NEW</Link>
            </div>
            <div className="admin-body">
              
              {
                this.props.admin.ventures.list.map((item, i) => {
                  return (
                    <div key={i}>
                      <VentureMiniCard venture={item} currentUser = {this.props.currentUser} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
    );
  }
}

