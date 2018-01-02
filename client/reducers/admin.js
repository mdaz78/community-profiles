// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function admin(state = null, action) {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_VENTURES_NEW_SUGGESTED_MEMBERS':
      copy.ventures.new.suggestedMembers = action.data;
      return copy;
    case 'ADD_MEMBER_TO_NEW_VENTURE':
      copy.ventures.new.team = action.data;
      copy.ventures.new.suggestedMembers = [];
      return copy;
    case 'UPDATE_ADMIN_VENTURES_LIST':
      copy.ventures.list = action.data;
      return copy;
    case 'UPDATE_ADMIN_SKILLS_LIST':
      copy.skills.list = action.data;
      return copy;
    case 'UPDATE_ADMIN_STATS':
      copy.stats.info = action.data;
      copy.stats.loading = false;
      return copy;
    default:
      return state;
  }
}

export default admin;