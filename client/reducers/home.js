const initialState = {
  sprints: {
    list: [],
    loading: true
  }
}

function home(state = initialState, action) {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'CREATE_NEW_SPRINT':
      copy.sprints.list.unshift(action.data);
      copy.sprints.loading = false;
      return copy;
    case 'UPDATE_SPRINTS_LIST':
      copy.sprints.list = action.data;
      copy.sprints.loading = false;
      return copy;
    case 'UPDATE_SPRINT_DETAILS':
      let index = copy.sprints.list.findIndex((sprint) => {
        return sprint._id === action.data.sprintId;
      });
      copy.sprints.list[index].description = action.data.sprint.description;
      copy.sprints.list[index].category = action.data.sprint.category;
      copy.sprints.list[index].dateTime = action.data.sprint.dateTime;
      return copy;
    case 'UPDATE_SPRINT_PARTICIPANT':
      index = copy.sprints.list.findIndex((sprint) => {
        return sprint._id == action.data.sprintId;
      });
      const indexParticipant = copy.sprints.list[index].participants.findIndex((user) => {
        return user._id == action.data.user._id;
      });

      if (indexParticipant == -1) {
        copy.sprints.list[index].participants.push(action.data.user);
      } else {
        copy.sprints.list[index].participants.splice(indexParticipant, 1);
      }
      return copy;
    default:
      return state;
  }
}

export default home;