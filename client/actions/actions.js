const updateCurrentUser = (data) => {
  return {
    type: 'UPDATE_CURRENT_USER',
    data,
  };
};

const updateAdminVenturesSuggestedMembers = (data) => {
  return {
    type: 'UPDATE_VENTURES_NEW_SUGGESTED_MEMBERS',
    data,
  };
};

const updateAdminStats = (data) => {
  return {
    type: 'UPDATE_ADMIN_STATS',
    data,
  };
};

const addNewVenture = (data) => {
  return {
    type: 'ADD_NEW_VENTURE',
    data,
  };
};

const updateAdminVenturesList = (data) => {
  return {
    type: 'UPDATE_ADMIN_VENTURES_LIST',
    data,
  };
};

const addNewSkill = (data) => {
  return {
    type: 'ADD_NEW_SKILL',
    data,
  };
};

const updateAdminSkillsList = (data) => {
  return {
    type: 'UPDATE_ADMIN_SKILLS_LIST',
    data,
  };
};

const updateSkillDetails = (data) => {
  return {
    type: 'UPDATE_SKILL_DETAILS',
    data,
  };
};

const updateSkillsList = (data) => {
  return {
    type: 'UPDATE_SKILLS_LIST',
    data,
  };
};

const updateVentureDetails = (data) => {
  return {
    type: 'UPDATE_VENTURE_DETAILS',
    data,
  };
};

const emptyVentureDetails = (data) => {
  return {
    type: 'EMPTY_VENTURE_DETAILS',
    data,
  };
};

const updateVenturesList = (data) => {
  return {
    type: 'UPDATE_VENTURES_LIST',
    data,
  };
}

const updateVenturesSuggestedMembers = (data) => {
  return {
    type: 'UPDATE_VENTURES_SUGGESTED_MEMBERS',
    data,
  };
}

const updateProfileDetails = (data) => {
  return {
    type: 'UPDATE_PROFILE_DETAILS',
    data,
  };
};

const updateProfilesList = (data) => {
  return {
    type: 'UPDATE_PROFILES_LIST',
    data,
  };
};

const createNewSprint = (data) => {
  return {
    type: 'CREATE_NEW_SPRINT',
    data,
  };
};

const updateSprintsList = (data) => {
  return {
    type: 'UPDATE_SPRINTS_LIST',
    data,
  };
};

const updateSprintsParticipants = (data) => {
  return {
    type: 'UPDATE_SPRINT_PARTICIPANT',
    data,
  };
};

const editSprint = (data) => {
  return {
    type: 'SHOW_MODAL',
    data,
  };
};

const updateSprint = (data) => {
  return {
    type: 'UPDATE_SPRINT_DETAILS',
    data,
  };
};

const hideModal = () => {
  return {
    type: 'HIDE_MODAL',
    data: '',
  };
};


export { updateCurrentUser, updateAdminVenturesSuggestedMembers, addNewVenture,
 updateAdminVenturesList, addNewSkill, updateAdminSkillsList, updateSkillDetails, updateProfileDetails,
 updateVentureDetails, updateSkillsList, updateVenturesList, updateProfilesList,
 updateVenturesSuggestedMembers, updateAdminStats, createNewSprint, updateSprintsList,
 updateSprintsParticipants, editSprint, updateSprint, hideModal, emptyVentureDetails,
}