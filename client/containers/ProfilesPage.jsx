import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.jsx';

export default class ProfilesPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { children, ...rest } = this.props;
    return (
      <div className="">
        {React.cloneElement(children, rest)}
      </div>
    );
  }
}