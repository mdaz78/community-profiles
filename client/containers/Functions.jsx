import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Functions extends Component {

  constructor(props) {
    super(props);

    const team = this.props.team;
    // const skillsInfo = Object.assign({}, this.props.skills);
    // const skillsInfo = JSON.parse(JSON.stringify(this.props.skills));
    const skills = this.props.skills;

    const indexOfSkills = skills.map((skill, i) => skill._id.toString());

    team.forEach((user, i) => {
      user.skills.forEach((skill, i) => {
        const index = indexOfSkills.indexOf(skill);
        if (skills[index].teamMembers) {
          skills[index].teamMembers.push(user);
        } else {
          skills[index].teamMembers = [user];
        }
      });
    });

    let filteredSkills = skills.filter((skill) => {
      return skill.teamMembers;
    });

    this.state = {
      team, skills, filteredSkills,
    };
  }

  render() {

    const filteredSkills = this.state.filteredSkills;

    return (
      <div className="product function">
        <h5>Functions</h5>
        {
          filteredSkills.map((skill, i) => {
            return (
              <div className="row" key={i}>
                <div className="function-content">
                  <div className="col-xs-12 col-sm-2 padding-0">
                    <div className="function-icon">
                      <img src={skill.logo || "/images/skill.png"} className="img-responsive" alt=""/>
                      <h6>{skill.name}</h6>
                    </div>
                  </div>
                  <div className="vertical-line"/>
                  <div className="col-xs-12 col-sm-10 function-container">
                    <div className="function-img">
                      {
                        skill.teamMembers.map((user, i) => {
                          return (
                            <div key={i} className="function-users">
                              <Link to={"/users/"+user.username}>
                                <div className="user-micro-card">
                                  <div>
                                    <img src={user.image || "/images/profile.jpg"} className="img-responsive" alt=""/>
                                  </div>
                                  <div>
                                    {user.name}
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        })
                      }
                      
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            )
          })
        }
        
      </div>
    );
  }
}

