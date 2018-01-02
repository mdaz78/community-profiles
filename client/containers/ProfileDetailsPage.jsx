import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header.jsx';
import * as actions from '../actions';
import Spinner from '../components/Spinner.jsx';

export default class ProfileDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(e) {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }
    let user = this.props.profiles.details.info;
    fetch('/api/users/delete/'+user.username, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    }).then((response) => {
      window.location = '/users';
    });

  }

  componentWillMount() {
    this.props.dispatch(actions.getProfileDetails(this.props.params.username));
  }

  render() {
    let user = this.props.profiles.details.info;
    let currentUser = this.props.currentUser;
    
    return (
      <div>
        {this.props.profiles.details.loading ?
          <Spinner />
          :
          <div>
            <div className="profile">
              <div className="container margin-top">
                <div className="col-sm-10 profile-wrapper col-sm-offset-1">
                  <div className="col-sm-4 col-md-4" style={{"paddingLeft":"0"}}>
                    <div className="profile-icon">
                      <img src={user.image || "/images/christopher-nolan.jpg"} className="profile-pic img-responsive" alt=""/>
                    </div>
                    <div className="social-icons">
                      <ul>
                        {user.github ? <li><a href={'https://github.com/'+user.github} target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a></li> : null}
                        {user.twitter ? <li><a href={'https://twitter.com/'+user.twitter} target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></li> : null}
                        {user.email ? <li><a href={"mailto:"+user.email} target="_blank"><i className="fa fa-envelope" aria-hidden="true"></i></a></li> : null}
                        {user.linkedin ? <li><a href={user.linkedin} target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li> : null}
                        <li><a href={"https://jaagastartup.slack.com/messages/@"+user.username} target="_blank"><i className="fa fa-slack" aria-hidden="true"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-8 col-md-8 padding-0" style={{paddingBottom: '20px'}}>
                    <div className="profile-header" style={{padding: '0px'}}>
                      <h2>{user.name}</h2>
                      <div className="edit-del-btn">
                        {this.props.currentUser && (this.props.currentUser.admin || (user._id == currentUser._id)) ?
                          <Link to={"/users/edit/"+user.username} className="col-sm-1 col-md-1 edit-btn">
                            <span className="glyphicon glyphicon-pencil"/>
                          </Link>
                        : null}
                        {(this.props.currentUser.admin && !user.admin) ?
                          <span className="glyphicon glyphicon-trash" onClick={this.deleteUser} />
                        : null}
                      </div>
                    </div>
                    <div className="clearfix" />
                    <h4>{user ? user.role : '' }</h4>
                    <p style={{"whiteSpace": "pre-wrap"}} dangerouslySetInnerHTML={{ __html: user.about }}></p>
                    {user.ventures.length > 0 ?
                      <div className="related-ventures">
                        <h5>RELATED VENTURES</h5>
                        <div className="ventures-logo">
                          {user.ventures.map((venture, i) => {
                            return (
                              <div key={i} className="text-center team-member">
                                <Link to={"/ventures/"+venture.slug} >
                                  <img src={venture.logo || "/images/flashinc.png"} className="img-responsive" alt="" />
                                  <h6>{venture.name}</h6>
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    :
                      null
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="col-sm-10 padding-0 col-sm-offset-1">
                <div className="profile-skillsets">
                  <h5>Skill Sets</h5>
                    {user.skills.length > 0 ?
                      <div>
                        {user.skills.map((skill, i) => {
                          return (
                            <div key={i} className="profile-skills">
                              <Link to={'/skills/'+skill.slug}>
                                <div className="skills-logo">
                                  <img src={skill.logo || "/images/HTML5.png"} className="img-responsive" alt=""/>
                                  <h6>{skill.name}</h6>
                                </div>
                              </Link>
                            </div>
                          )
                        })}
                      </div>
                    :
                      <div className="text-center ">No Skills Mentioned.</div>
                    }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

