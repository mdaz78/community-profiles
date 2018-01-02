import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  render() {
    return (
      <header>
        <div className="wrap-inner">
          <nav>
            <input type="checkbox" id="toggle" />
            <label htmlFor="toggle" className="menu-icon">
              <div className="hamburger-icon icon-1"></div>
              <div className="hamburger-icon icon-2"></div>
              <div className="hamburger-icon icon-3"></div>
            </label>
              <IndexLink activeClassName="active" to="/">
                <img src="/images/logo.png" className="logo img-responsive" alt=""/>
              </IndexLink>
            <ul className="menu user-nav">
              <li>
                <IndexLink activeClassName="active" to="/">
                  {/*<i className="flaticon-home"></i>*/}
                  <span>People</span>
                  </IndexLink>
              </li>
              <li>
                <Link activeClassName="active" to="/skills">
                  {/*<i className="flaticon-coding"></i>*/}
                  <span>Skills</span>
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to="/ventures">
                  {/*<i className="flaticon-business"></i>*/}
                  <span>Ventures</span>
                </Link>
              </li>
              <li>
                <a href="https://jaagastartup.slack.com" target="_blank">
                  {/*<i className="flaticon-business"></i>*/}
                  <span>Slack</span>
                </a>
              </li>
              {/*
              <li>
                <Link activeClassName="active" to="/users">
                  <i className="flaticon-users"></i>
                  <span>People</span>
                </Link>
              </li>
              */}
            </ul>
            {/* 
              <div className="search-input">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" name="" id="input" className="form-control"required="required" />
              </div>
            */}
            {this.props.currentUser ?
                <div className=" profile-btn">
                  <Link to={"/users/"+this.props.currentUser.username} >
                    <img src={this.props.currentUser.image} className="img-responsive" alt=""/>
                  </Link>
                  <a className="logout-btn" href="/auth/logout">
                   <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                  </a>
                </div>
            : null}
          </nav>
        </div>
      </header>
    );
  }
}

