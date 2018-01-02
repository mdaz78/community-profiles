import React, { Component } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar.jsx';

export default class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  render() {
    var { children, ...rest } = this.props;
    return (
      <div>
        <div className="admin-page">
          <div className="col-xs-2">
            <AdminSidebar />
          </div>
          <div className="col-xs-10 col-sm-12 col-md-10 margin-left">
            {React.cloneElement(children, rest)}
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

AdminPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};