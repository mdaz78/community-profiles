import React, { Component } from 'react';

export default class WritePost extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  render() {
    return (
      <div className="write-post post">
        <p>Write to educate others about this skill or ask question...</p>
        <div className="actions">
          <div>
            <i className="fa fa-picture-o" aria-hidden="true"></i>
            <i className="fa fa-link" aria-hidden="true"></i>
          </div>
          <button type="button" className="btn">POST</button>
        </div>
      </div>
    );
  }
}

