import React, { Component } from 'react';
import { Link } from 'react-router';

const ProfileMiniCard = (props) => {
  return (
    <Link to={"/users/"+props.profile.username} >
      <div className="user-micro-card">
        <img src={props.profile.image || "/images/user.svg"} className="img-responsive" alt="" />
        <div>
            <p className="skilled-user">{props.profile.name}</p>
            <p className="designation">{props.profile.ventures.length > 0 ? props.profile.ventures[0].name : ''}</p>
          {/*{props.currentUser && (props.currentUser.admin || props.currentUser._id == props.profile._id) ?
            <Link to={"/users/edit/"+props.profile.username} >
              <span className="glyphicon glyphicon-pencil" />
            </Link>
          : null}*/}
        </div>
      </div>
    </Link>
  );
};

export default ProfileMiniCard;