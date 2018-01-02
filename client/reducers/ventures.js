function ventures(state = null, action) {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_VENTURE_DETAILS':
      copy.details.info = action.data;
      copy.details.loading = false;
      return copy;
    case 'UPDATE_VENTURES_LIST':
      copy.list.info = action.data;
      copy.list.loading = false;
      return copy;
    case 'UPDATE_VENTURES_SUGGESTED_MEMBERS':
      copy.details.info.suggestedMembers = action.data;
      return copy;
    case 'UPDATE_MEMBER_IN_EDIT_VENTURE':
      copy.details.info.team = action.data;
      return copy;
    case 'EMPTY_VENTURE_DETAILS':
      copy.details.info = null;
      copy.details.loading = true;
      return copy;
    default:
      return state;
  }
}

export default ventures;