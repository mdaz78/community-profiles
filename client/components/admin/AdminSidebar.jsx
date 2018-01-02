import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

const AdminSidebar = (props) => {
  return (
      <div className="admin-links margin-top">
        <ul>
          <li>
            <IndexLink activeClassName="active" type="button" to="/admin">
              <i className="flaticon-graphic" />
              <span>Stats</span>
            </IndexLink>
          </li>
          <li>
            <Link activeClassName="active" type="button" to="/admin/ventures">
              <i className="flaticon-business" />
              <span>Ventures</span>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/admin/skills">
              <i className="flaticon-coding" />
              <span>skills</span>
            </Link>
          </li>
        </ul>
      </div>
  );
};

export default AdminSidebar;
