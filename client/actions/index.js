import * as api from './ajaxCalls';
import * as actions from './actions';

const updateProfile = (username, data) => {
  return (dispatch) => {
    return api.updateProfile(username, data).then(
      (res) => {
        return true;
        // dispatch(actions.updateCurrentUser(data));
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchAdminVentures = () => {
  return (dispatch) => {
    return api.fetchVentures().then(
      (res) => {
        dispatch(actions.updateAdminVenturesList(res.ventures));
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchAdminStats = () => {
  return (dispatch) => {
    return api.fetchAdminStats().then(
      (res) => {
        dispatch(actions.updateAdminStats(res.stats));
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchAdminVenturesSuggestedMembers = (data) => {
  return (dispatch) => {
    return api.fetchSuggestedMembers(data).then(
      (res) => {
        dispatch(actions.updateAdminVenturesSuggestedMembers(res.users));
      },
      (err) => {
        return false;
      }
    );
  };
};

const addNewVenture = (data) => {
  return (dispatch) => {
    return api.addNewVenture(data).then(
      (res) => {
        dispatch(actions.addNewVenture(res.venture));
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchAdminSkills = () => {
  return (dispatch) => {
    return api.fetchSkills().then(
      (res) => {
        dispatch(actions.updateAdminSkillsList(res.skills));
      },
      (err) => {
        return false;
      }
    );
  };
};

const addNewSkill = (data) => {
  return (dispatch) => {
    return api.addNewSkill(data).then(
      (res) => {
        dispatch(actions.addNewSkill(res.skill));
      },
      (err) => {
        return false;
      }
    );
  };
};

const addMemberToNewVenture = (data) => {
  return {
    type: 'ADD_MEMBER_TO_NEW_VENTURE',
    data,
  };
};

const updateMemberInEditVenture = (data) => {
  return {
    type: 'UPDATE_MEMBER_IN_EDIT_VENTURE',
    data,
  };
}


const getProfileDetails = (username) => {
  return (dispatch) => {
    return api.getProfileDetails(username).then(
      (res) => {
        dispatch(actions.updateProfileDetails(res.user));
      },
      (err) => {
        return false;
      }
    );
  };
};

const getSkillDetails = (slug) => {
  return (dispatch) => {
    return api.getSkillDetails(slug).then(
      (res) => {
        dispatch(actions.updateSkillDetails(res.skill));
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchSkills = () => {
  return (dispatch) => {
    return api.fetchSkills().then(
      (res) => {
        dispatch(actions.updateSkillsList(res.skills));
      },
      (err) => {
        return false;
      }
    );
  };
};

const updateSkill = (slug, data) => {
  return (dispatch) => {
    return api.updateSkill(slug, data).then(
      (res) => {
        // dispatch(actions.updateCurrentUser(data));
        return true;
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchVentures = () => {
  return (dispatch) => {
    return api.fetchVentures().then(
      (res) => {
        dispatch(actions.updateVenturesList(res.ventures));
      },
      (err) => {
        return false;
      }
    );
  };
};

const getVentureDetails = (slug) => {
  return (dispatch) => {
    return api.getVentureDetails(slug).then(
      (res) => {
        dispatch(actions.updateVentureDetails(res.venture));
      },
      (err) => {
        return false;
      }
    );
  };
};

const updateVenture = (slug, data) => {
  return (dispatch) => {
    return api.updateVenture(slug, data).then(
      (res) => {
        // dispatch(actions.updateCurrentUser(data));
        return true;
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchVenturesSuggestedMembers = (data) => {
  return (dispatch) => {
    return api.fetchSuggestedMembers(data).then(
      (res) => {
        dispatch(actions.updateVenturesSuggestedMembers(res.users));
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchProfiles = () => {
  return (dispatch) => {
    return api.fetchProfiles().then(
      (res) => {
        dispatch(actions.updateProfilesList(res.users));
      },
      (err) => {
        return false;
      }
    );
  };
};

const createNewSprint = (data) => {
  return (dispatch) => {
    return api.createNewSprint(data).then(
      (res) => {
        dispatch(actions.createNewSprint(res.sprint));
      },
      (err) => {
        return false;
      }
    );
  };
};

const fetchSprints = () => {
  return (dispatch) => {
    return api.fetchSprints().then(
      (res) => {
        dispatch(actions.updateSprintsList(res.sprints));
      },
      (err) => {
        return false;
      }
    );
  };
};

const toggleAttendance = (data) => {
  return (dispatch) => {
    return api.toggleAttendance(data).then(
      (res) => {
        dispatch(actions.updateSprintsParticipants({ sprintId: data.sprintId, user: res.user }));
      },
      (err) => {
        return false;
      }
    );
  };
};

const updateSprint = (data) => {
  return (dispatch) => {
    return api.updateSprint(data).then(
      (res) => {
        dispatch(actions.updateSprint({ sprintId: data.sprintId, sprint: res.sprint }));
      },
      (err) => {
        return false;
      }
    );
  };
};

const deleteSprint = (data) => {
  return (dispatch) => {
    return api.deleteSprint(data).then(
      (res) => {
        return true;
      },
      (err) => {
        return false;
      }
    );
  };
};


export {
  updateProfile, fetchAdminStats, fetchAdminVenturesSuggestedMembers, addMemberToNewVenture, getProfileDetails,
  addNewVenture, fetchAdminVentures, addNewSkill, fetchAdminSkills, getSkillDetails,
  getVentureDetails, fetchSkills, fetchVentures, fetchProfiles, fetchVenturesSuggestedMembers, updateMemberInEditVenture,
  updateVenture, updateSkill, createNewSprint, fetchSprints, toggleAttendance, updateSprint, deleteSprint,
};

