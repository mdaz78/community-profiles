import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App.jsx';
import HomePage from './containers/HomePage.jsx';

import OnboardingPage from './containers/OnboardingPage.jsx';

import SkillsPage from './containers/SkillsPage.jsx';
import SkillDetailsPage from './containers/SkillDetailsPage.jsx';
import SkillListPage from './containers/SkillListPage.jsx';
import SkillEditPage from './containers/SkillEditPage.jsx';

import HomePageWithProfiles from './containers/HomePageWithProfiles.jsx';
import ProfilesPage from './containers/ProfilesPage.jsx';
import ProfileListPage from './containers/ProfileListPage.jsx';
import ProfileDetailsPage from './containers/ProfileDetailsPage.jsx';
import ProfileEditPage from './containers/ProfileEditPage.jsx';

import VenturesPage from './containers/VenturesPage.jsx';
import VentureDetailsPage from './containers/VentureDetailsPage.jsx';
import VentureListPage from './containers/VentureListPage.jsx';
import VentureEditPage from './containers/VentureEditPage.jsx';

import AdminPage from './containers/AdminPage.jsx';
import AdminVenturesPage from './containers/AdminVenturesPage.jsx';
import VentureForm from './containers/VentureForm.jsx';
import AdminStatsPage from './containers/AdminStatsPage.jsx';
import AdminSkillsPage from './containers/AdminSkillsPage.jsx';
import SkillForm from './containers/SkillForm.jsx';

const getRoutes = (store) => {

  const adminRequired = (nextState, replace) => {
    // Now you can access the store object here.
    const state = store.getState();

    if (!state.currentUser || !state.currentUser.admin) {
      replace('/');
    }
  };

  const authRequired = (nextState, replace) => {
    // Now you can access the store object here.
    const state = store.getState();

    if (!state.currentUser) {
      replace('/');
    }
  };

  const profileAuthRequired = (nextState, replace) => {
    const state = store.getState();

    if (!state.currentUser || (!state.currentUser.admin && (state.currentUser.username !== nextState.params.username))) {
      replace('/');
    }
  };

  return (
    <Route name="app" component={App} path="/">
    	<IndexRoute name="homePage" component={HomePageWithProfiles} />
    	<Route name="onboarding" component={OnboardingPage} path="/onboarding" onEnter={authRequired} />
      <Route name="profile" path="/users" component={ProfilesPage}>
        <IndexRoute component={ProfileListPage} />
        <Route name="profileEditPage" component={ProfileEditPage} path="edit/:username" onEnter={profileAuthRequired} />
        <Route name="profileDetailsPage" component={ProfileDetailsPage} path=":username" />
      </Route>
      <Route name="venturesPage" path="/ventures" component={VenturesPage}>
        <IndexRoute component={VentureListPage} />
        <Route name="ventureEditPage" component={VentureEditPage} path="edit/:slug" onEnter={authRequired} />
        <Route name="ventureDetailsPage" component={VentureDetailsPage} path=":slug" />
      </Route>
      <Route name="skillsPage" path="/skills" component={SkillsPage}>
        <IndexRoute component={SkillListPage} />
        <Route name="skillEditPage" component={SkillEditPage} path="edit/:slug" onEnter={adminRequired} />
        <Route name="skillDetailsPage" component={SkillDetailsPage} path=":slug" />
      </Route>
    	<Route name="admin" component={AdminPage} path="/admin" onEnter={adminRequired} >
        <IndexRoute name="adminStats" component={AdminStatsPage} />
        <Route name="adminVentures" path="ventures">
          <IndexRoute component={AdminVenturesPage} />
          <Route name="createNewVenture" component={VentureForm} path="new" />
        </Route>
        <Route name="adminSkills" path="skills">
          <IndexRoute component={AdminSkillsPage} />
          <Route name="createNewSkill" component={SkillForm} path="new" />
        </Route>
      </Route>
    </Route>
  );
};

export default getRoutes;