// a reducer takes in two things:

const defaultState = {
  name: '',
  info: {}
};

function modals(state = defaultState, action) {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'SHOW_MODAL':
      copy.name = action.data.name;
      copy.info = action.data.info;
      return copy;
    case 'HIDE_MODAL':
      copy.name = '';
      copy.info = '';
      return copy;
    default:
      return state;
  }
}

export default modals;