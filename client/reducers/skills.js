// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state
const defaultState = {
  list: {
    info: [],
    loading: true,
  },
  details: {
    info: {},
    loading: true,
  },
};

function skills(state = defaultState, action) {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_SKILL_DETAILS':
      copy.details.info = action.data;
      copy.details.loading = false;
      return copy;
    case 'UPDATE_SKILLS_LIST':
      copy.list.info = action.data;
      copy.list.loading = false;
      return copy;
    default:
      return copy;
  }
}

export default skills;