import React, { Component } from 'react';
import * as actions from '../actions';
import Spinner from '../components/Spinner.jsx';
import ProfileForm from '../components/profiles/ProfileForm.jsx';

export default class ProfileEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true, savingUser: false },
    this.updateProfile = this.updateProfile.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.getProfileDetails(this.props.params.username)).then(() => {
      this.props.profiles.details.info.skills = this.props.profiles.details.info.skills.map((skill, i) => {
        return skill._id.toString();
      });
      this.setState({ user: this.props.profiles.details.info });
    });
    this.props.dispatch(actions.fetchSkills()).then(() => {
      this.setState({ loading: false });
    })
  }

  updateProfile(data) {
    this.setState({ savingUser: true });
    this.props.dispatch(actions.updateProfile(this.props.params.username, data)).then(() => {
      this.setState({ savingUser: false });
      this.context.router.push('/users/'+ this.props.params.username);
    });
  }

  updateSkills(skills) {
    let user = this.state.user;
    user.skills = skills;
    this.setState({ user: user });
  }

  updateImage(image) {
    let user = this.state.user;
    user.image = image;
    this.setState({ user: user });
  }

  render() {

    return (
      <div className="">
        <div className="container">
          {!this.state.loading && this.state.user ?
            <div>
              <ProfileForm
                updateProfile={this.updateProfile}
                updateSkills={this.updateSkills}
                user={this.state.user}
                skills={this.props.skills.list.info}
                updateImage = {this.updateImage}
                savingUser = {this.state.savingUser}
              />
            </div>
            :
            <Spinner />
          }
        </div>
      </div>
    );
  }
}

ProfileEditPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

