// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function currentUser(state = null, action) {
  switch (action.type) {
    case 'ADD_CURRENT_USER':
      return state = action.data.currentUser;
    case 'REMOVE_CURRENT_USER':
      return state = null;
    case 'UPDATE_PROFILE':
      var copy = Object.assign({}, state);
      copy.name = action.data.name;
      copy.phone = action.data.phone;
      copy.city = action.data.city;
      copy.expertise = action.data.expertise;
      copy.experience = action.data.experience;
      copy.qualification = action.data.qualification;
      return copy;
    case 'UPDATING_PROFILE_FAILED':
      return state;
    case 'UPDATE_PROFILE_IMAGE':
      var copy = Object.assign({}, state);
      copy.image = action.data;
      return copy;
    default:
      return state;
  }
}

export default currentUser;