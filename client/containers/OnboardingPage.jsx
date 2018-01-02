import React, { Component } from 'react';
import * as actions from '../actions/index';
import Spinner from '../components/Spinner.jsx';
import ProfileForm from '../components/profiles/ProfileForm.jsx';

export default class OnboardingPage extends Component {

  constructor(props) {
    super(props);
    this.state = { currentUser: this.props.currentUser, loading: true, savingUser: false };
    this.onboardingDone = this.onboardingDone.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchSkills()).then(() => {
      this.setState({ loading: false });
    });
  }

  updateSkills(skills) {
    let currentUser = this.state.currentUser;
    currentUser.skills = skills;
    this.setState({ currentUser: currentUser });
  }

  updateImage(image) {
    let user = this.state.user;
    user.image = image;
    this.setState({ user: user });
  }

  onboardingDone(data) {
    this.setState({ savingUser: true });
    this.props.dispatch(actions.updateProfile(this.state.currentUser.username , data)).then(() => {
      this.setState({ savingUser: false });
      this.context.router.push('/users/'+this.state.currentUser.username);
    });
  }

  render() {

    return (
      <div className="setup-page">
        <div className="container">
          <h2 className="text-center">Lets setup your profile</h2>
          {
            this.state.loading ?
            <Spinner />
            :
            <ProfileForm
              updateProfile={this.onboardingDone}
              updateSkills={this.updateSkills}
              user={this.state.currentUser}
              skills={this.props.skills.list.info}
              updateImage = {this.updateImage}
              savingUser = {this.state.savingUser}
            />
          }
        </div>
      </div>
    );
  }
}


OnboardingPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
