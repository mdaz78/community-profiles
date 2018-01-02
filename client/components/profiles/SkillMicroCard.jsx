import React from 'react';

const SkillMicroCard = (props) => {

  let skill = props.skill;

  const toggleSelect = (e) => {
    e.preventDefault();
    let id = e.currentTarget.getAttribute('data-id');
    props.toggleSkill(id);
  }

  return (
    <div className={"micro-card " + (props.selected ? ' selected' : '')} data-id={skill._id} onClick={toggleSelect}>
      <div className="micro-card-image">
        <img src={ skill.logo || "/images/HTML5.png"} />
      </div>
      <div className="micro-card-name text-center">
        <span>{skill.name}</span>
          {props.selected ?
            <i className="glyphicon glyphicon-ok-circle"></i>
          :
            <i className="glyphicon glyphicon-remove-circle"></i>
          }
      </div>
    </div>
  )
}

export default SkillMicroCard;