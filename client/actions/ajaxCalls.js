const updateProfile = (username, data) => {
  const url = '/api/users/update/'+username;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Updating User failed.');
    }
    return response.json();
  });
};


const fetchSuggestedMembers = (data) => {
  const url = `/api/users/suggestions/fetch?name=${data.name}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};

const fetchAdminStats = () => {
  const url = `/api/admin/stats`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
}

const addNewVenture = (data) => {
  const url = '/api/admin/ventures/new';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};

const fetchVentures = () => {
  const url = '/api/ventures';

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};

const addNewSkill = (data) => {
  const url = '/api/admin/skills/new';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Adding new skill failed.');
    }
    return response.json();
  });
};

const fetchSkills = () => {
  const url = '/api/skills';

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};

const getProfileDetails = (username) => {
  const url = `/api/users/${username}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};

const getSkillDetails = (slug) => {
  const url = `/api/skills/${slug}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};

const updateSkill = (slug, data) => {
  const url = '/api/skills/update/'+slug;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Updating User failed.');
    }
    return response.json();
  });
};

const getVentureDetails = (slug) => {
  const url = `/api/ventures/${slug}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};

const updateVenture = (slug, data) => {
  const url = '/api/ventures/update/'+slug;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Updating User failed.');
    }
    return response.json();
  });
};


const fetchProfiles = () => {
  const url = `/api/users`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};

const fetchSprints = () => {
  const url = '/api/sprints';

  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('fetching suggested members failed');
    }
    return response.json();
  });
};


const createNewSprint = (data) => {
  const url = '/api/sprints/new';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Sprint Creation failed.');
    }
    return response.json();
  });
};

const toggleAttendance = (data) => {
  const url = '/api/sprints/toggle-attend';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Failed.');
    }
    return response.json();
  });
};

const updateSprint = (data) => {
  const url = '/api/sprints/update';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Failed.');
    }
    return response.json();
  });
};

const deleteSprint = (data) => {
  const url = '/api/sprints/delete';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Failed.');
    }
    return response.json();
  });
};


export { updateProfile, fetchSuggestedMembers, addNewVenture, fetchAdminStats,
  fetchVentures, addNewSkill, fetchSkills, getSkillDetails, getProfileDetails,
  getVentureDetails, fetchProfiles, updateVenture, updateSkill, createNewSprint,
  fetchSprints, toggleAttendance, updateSprint, deleteSprint,
};