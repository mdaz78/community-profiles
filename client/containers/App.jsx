import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.jsx';
// import LoginPage from './LoginPage.jsx';
// import ProfilePage from './ProfilePage.jsx';
// import VenturePage from './VenturePage.jsx';
// import OnboardingPage from './OnboardingPage.jsx';
// import SkillSets from './SkillSets.jsx';
// import AdminPage from './AdminPage.jsx';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  render() {
    var { children, ...rest } = this.props;
    return (
      <div className="app">
        {(this.props.location.pathname === '/' && !this.props.currentUser) ?
          null 
          :
          <Header currentUser={this.props.currentUser} />
        }
        {React.cloneElement(children, rest)}
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return store;
}

export default connect(mapStateToProps)(App);