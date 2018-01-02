import React from 'react';
import { Link } from 'react-router';
import * as actionCreators from '../../actions/index';
import * as actions from '../../actions/actions';

const SprintRequest = (props) => {
  const sprint = props.sprint;

  const toggleAttendance = () => {
    props.dispatch(actionCreators.toggleAttendance({ sprintId: props.sprint._id }));
  };

  const participating = sprint.participants.findIndex((participant, i) => {
    return props.currentUser._id == participant._id;
  });

  const openEditModal = () => {
    props.dispatch(actions.editSprint({ name: 'editSprint', info: { sprint } }));
  };

  const deleteSprint = () => {
    if (confirm('Are you sure want to delete this?')) {
      props.dispatch(actionCreators.deleteSprint({ sprintId: sprint._id })).then(() => {
        window.location = '/';
      });
    }
  };

  return (
    <div className="client-request margin-bottom">
      <div className="client">
        <div className="client-details">
            <img src={sprint.sprintHead.image} className="img-responsive client-img" />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Link to={'/users/'+sprint.sprintHead.username}><span className="client-name">{sprint.sprintHead.name}</span></Link>
              {/* <span style={{color: '#777', fontSize: '12px', fontStyle: 'italic'}}>from</span> */}
              {sprint.sprintHead.ventures.length > 0 ?
                <Link to={'/ventures/'+sprint.sprintHead.ventures[0].slug}>
                  <span className="client-category">
                    {sprint.sprintHead.ventures ? (<span className="place">{sprint.sprintHead.ventures[0].name}</span>): null }
                  </span>
                </Link>
              : null}
            </div>
        </div>
        <div className="date-category">
          <div className="date">
            <div className="time">
              <p>{(new Date(sprint.dateTime)).toDateString()}</p>
            </div>
          </div>
          <div className="text-right plan" style={{textTransform: 'capitalize'}}>
            <p>{sprint.category.name}</p>
          </div>
          {sprint.sprintHead._id == props.currentUser._id ?
            <div className="date">
                {/* <span className="glyphicon glyphicon-menu-down"></span> */}
              <span className="glyphicon glyphicon-pencil" onClick={openEditModal}></span>
              <span className="glyphicon glyphicon-trash" onClick={deleteSprint}></span>
              {/*
                <div className="edit-delete-btn">
                  <div className="edit">
                    <span className="glyphicon glyphicon-pencil"></span>
                    <span>Edit</span>
                  </div>
                  <div className="delete">
                    <span className="glyphicon glyphicon-trash"></span>
                    <span>Delete</span>
                  </div>
                </div>
              */}
            </div>
            : null
          }
        </div>
      </div>
      <div className="request">
        <p>{sprint.description}</p>
      </div>
      <div className="date-plan">
        <div onClick={toggleAttendance}>
          <p className="count">
            {participating == -1 ? <span>Count me in</span> : <span>Count me out</span> }
            <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
          </p>
        </div>
        <div className="emoticons">
          {
            sprint.participants.map((user, i) => {
              return ( <Link className="icon" key={i} to={'/users/'+user.username} title={user.name}><img  src={user.image} className="img-responsive" alt=""/></Link> );
            })
          }
        </div>
      </div>
    </div>
  );
};


export default SprintRequest;
