import React, { Component } from 'react';
import Login from '../components/LoginPage.jsx';
import * as actions from '../actions';
import SkillMiniCard from '../components/skills/SkillMiniCard.jsx';
import Spinner from '../components/Spinner.jsx';
import SprintRequest from '../components/home/SprintRequest.jsx';
import SprintForm from '../components/home/SprintForm.jsx';
import EditModal from '../components/home/Editmodal.jsx';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    if(this.props.currentUser) {
      this.props.dispatch(actions.fetchSprints());
    }
  }

  render() {
    return (
      <div>
        {this.props.currentUser ?
          <div className="wrap-inner margin-top">
            <div className="col-md-5 sprint-form col-md-push-7">
              <SprintForm {...this.props} />
            </div>
              {
                this.props.home.sprints.loading ?
                  <Spinner />
                :
                <div className="col-md-7 sprint-request col-md-pull-5" style={{"paddingLeft":"0"}}>
                  {
                    this.props.home.sprints.list.map((sprint, i) => 
                      <SprintRequest key={i} sprint={sprint} dispatch={this.props.dispatch} currentUser={this.props.currentUser} /> )
                  }
                </div>
              }
            <div className="clearfix" />
              {/*<h1 className="col-md-12 col-sm-12 text-center">Jaaga Community!</h1>
              <h2 className="col-md-12 col-sm-12">Skills</h2>
              {this.props.skills.list.loading ?
                <Spinner />
                :
                <div>
                  {this.props.skills.list.info.length > 0 ?
                    this.props.skills.list.info.map((item, i) => {
                      return (
                        <div key={i}>
                          <SkillMiniCard skill={item} currentUser={this.props.currentUser} />
                        </div>
                      );
                    })
                    :
                    <div className="col-sm-12 col-md-12 text-center">No Skills Listed.</div>
                  }
                </div>
              }*/}
          </div>
        :
          <Login />
        }
        {this.props.modals.name == 'editSprint' ? <EditModal {...this.props} /> : null }
      </div>
    );
  }
}

