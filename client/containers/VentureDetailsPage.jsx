import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header.jsx';
import Functions from './Functions.jsx';
import * as actions from '../actions';
import * as actionsCreators from '../actions/actions';
import Spinner from '../components/Spinner.jsx';

export default class VenturePage extends Component {
  constructor(props) {
    super(props);
    this.deleteVenture = this.deleteVenture.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.getVentureDetails(this.props.params.slug));
    this.props.dispatch(actions.fetchSkills());
  }

  deleteVenture(e) {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this venture?')){
      return;
    }
    let venture = this.props.ventures.details.info;
    fetch('/api/ventures/delete/'+venture.slug, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    }).then((response) => {
      window.location = '/ventures';
    });
  }

  componentWillUnmount() {
    this.props.dispatch(actionsCreators.emptyVentureDetails());
  }

  render() {
    let venture = this.props.ventures.details.info;
    let currentUser = this.props.currentUser;

    const ventureTeamIds = [];

    if (!this.props.ventures.details.loading) {
      venture.team.forEach(user => ventureTeamIds.push(user._id));
    }

    return (
      <div>
        {
          this.props.ventures.details.loading ?
          <Spinner />
          :
          <div>
            <div className="profile">
              <div className="wrap-inner margin-top">
                <div className="col-sm-10 profile-wrapper col-sm-offset-1">
                  <div className="col-sm-4 col-md-4" style={{"paddingLeft":"0"}}>
                    <div className="profile-icon">
                      <img src={venture.logo || "/images/braincamp-logo.jpg"} className="img-responsive" alt=""/>
                    </div>
                    <div className="social-icons">
                      <ul>
                        {venture.github ? <li><a href={venture.github}><i className="fa fa-github" aria-hidden="true"></i></a></li> : null}
                        {venture.twitter ? <li><a href={venture.twitter}><i className="fa fa-twitter" aria-hidden="true"></i></a></li> : null}
                        {venture.email ? <li><a href={"mailto:"+venture.email}><i className="fa fa-envelope" aria-hidden="true"></i></a></li> : null}
                        {venture.linkedin ? <li><a href={venture.linkedin}><i className="fa fa-linkedin" aria-hidden="true"></i></a></li> : null}
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-8 col-md-8 padding-0" style={{paddingBottom: '20px'}}>
                    <div className="profile-header">
                      <h2 className="">{venture.name}</h2>
                      <div className="edit-del-btn">
                        {this.props.currentUser && (this.props.currentUser.admin || (ventureTeamIds.indexOf(currentUser._id) !== -1)) ?
                          <Link to={"/ventures/edit/"+venture.slug} className="col-sm-1 col-md-1 edit-btn">
                            <span className="glyphicon glyphicon-pencil" />
                          </Link>
                        : null}
                        {(this.props.currentUser && this.props.currentUser.admin) ?
                          <span className="glyphicon glyphicon-trash" onClick={this.deleteVenture} data-slug />
                          : null }
                      </div>
                    </div>
                    <div className="clearfix" />
                    <p>{venture.problemStatement}</p>
                    <div className="related-ventures">
                      <h5>TEAM</h5>
                      <div className="ventures-logo team">
                        {
                          venture.team.length > 0 ?
                          venture.team.map((user, i) => {
                            return (
                              <div key={i} className="text-center team-member">
                                <Link to={"/users/"+user.username}>
                                  <img src={user.image || "/images/emilia.jpg"} className="img-responsive" alt=""/>
                                  <h6>{user.name}</h6>
                                </Link>
                              </div>
                            )
                          })
                          :
                          <div>No Team Members.</div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
            </div>
            <div className="wrap-inner">
              <div className="col-sm-10 col-sm-offset-1 padding-0">
                  <div className="product">
                    <h5>What We Do</h5>
                    <p>{venture.mvp || 'No info.'}</p>
                  </div>
                  {
                    this.props.skills.list.loading ?
                    <Spinner />
                    :
                    <Functions skills={JSON.parse(JSON.stringify(this.props.skills.list.info))} team={this.props.ventures.details.info.team} />
                  }
              </div>
              <div className="clearfix" />
            </div>
          </div>
        }
      </div>
    );
  }
}

