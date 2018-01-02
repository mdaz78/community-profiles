import React, { Component } from 'react';
import { Link } from 'react-router';

const PeopleWidget = (props) => {

  return (
    <div className="post">
      <h5>People With this Skill</h5>
      <div className="skilled-person">
        {
          props.skill.users.length > 0 ?
            props.skill.users.map((user, i) => {
              return (
                <div key={i} className="people-widget">
                  <Link to={`/users/${user.username}`}>
                    <div className="user-micro-card">
                      <img src={user.image || "/images/jon.jpg"} className="img-responsive" alt=""/>
                      <div>
                        <p className="skilled-user">{user.name}</p>
                        <p className="designation">{(user.ventures && user.ventures.length > 0) ? user.ventures[0].name : ''}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          :
          <div className="text-center">No Users.</div>
        }
      </div>
    </div>
  );
}
export default PeopleWidget;