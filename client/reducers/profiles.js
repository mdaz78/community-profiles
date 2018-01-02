// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function profiles(state = null, action) {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_PROFILE_DETAILS':
      copy.details.info = action.data;
      copy.details.loading = false;
      return copy;
    case 'UPDATE_PROFILES_LIST':
      copy.list.info = action.data;
      copy.list.loading = false;
      return copy;
    default:
      return state;
  }
}

export default profiles;