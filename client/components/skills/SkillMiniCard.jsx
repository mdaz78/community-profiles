import React, { Component } from 'react';
import { Link } from 'react-router';

const SkillMiniCard = (props) => {
  return (
    <div className="img-card">
      <Link to={"/skills/"+props.skill.slug} className="img-container">
        <div className="content">
          <div className="card-shot">
            <div className="card-img">
              <div className="img-container">
                <img src={props.skill.logo || "/images/skill.svg"} className="" alt="" />
              </div>
              {/*{props.currentUser && props.currentUser.admin ?
                <Link to={"/skills/edit/"+props.skill.slug}>
                  <span className="glyphicon glyphicon-pencil" aria-hidden="true"/>
                </Link>
              : null} */}
            </div>
            <div className="content-action">
              <h6>{props.skill.name.length > 13 ? props.skill.name.slice(0,13) + '...'  : props.skill.name }</h6>
              <div className="learn-more">
                <h6>Learn More</h6>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SkillMiniCard;
