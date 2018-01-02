import React from 'react';
import SkillMicroCard from './SkillMicroCard.jsx';

const ProfileForm = (props) => {
  let user = props.user;
  let allSkills = props.skills;

  let name;
  let github;
  let twitter;
  let linkedin;
  let about;
  let role;
  let image;
  let skills = user ? user.skills : null;

  const updateProfile = (e) => {
    e.preventDefault();

    if (props.savingUser) {
      return;
    }

    name = name.value;
    about = about.value;
    linkedin = linkedin.value;
    twitter = twitter.value;
    github = github.value;
    role = role.value;
    skills = user.skills;
    image = user.image;

    if (!name || !role || !about) {
      return alert('You must fill in name, role and about.');
    }

    if (skills.length == 0) {
      return alert('You must select at least one skill.');
    }

    let data = { name, about, role, linkedin, github, twitter, skills, image };

    props.updateProfile(data);

  }

  const toggleSkill = (id) => {
    let index = skills.indexOf(id);
    if (index === -1) {
      skills.push(id);
    } else {
      skills.splice(index, 1);
    }
    props.updateSkills(skills);
  };

  const triggerProfileImageClick = (e) => {
    e.preventDefault();
    document.getElementById('user-profile-image').click();
  };

  const uploadProfileImage = (e) => {
    var file = document.getElementById('user-profile-image').files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var image = e.target.result;
      props.updateImage(image);
      document.getElementById('profileImage').setAttribute('src', image);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="col-sm-10 col-sm-offset-1 admin-form margin-top profile-form">
      <div className="col-sm-4 col-md-3 text-center" style={{"paddingLeft":"0"}}>
        <div className="upload-logo">
          <div className="chose-logo">
            <img src={user ? user.image : "/images/profile.png"} id="profileImage" className="img-responsive" alt="" />
            <div className="change-logo" onClick={triggerProfileImageClick}>
              <span className="glyphicon glyphicon-camera"></span>
            </div>
            <input type="file" id="user-profile-image" style={{display: 'none'}} onChange={uploadProfileImage} />
          </div>
        </div>
      </div>
      <div className="col-sm-8 col-md-9">
          <label className="label-control">Name</label>
          <input
            type="text" id="input"
            className="form-control"
            defaultValue={user.name}
            ref={(c) => { name = c; }}
            required="required"
          />
          <label className="label-control">Role</label>
          <input type="text" id="input" className="form-control" defaultValue={user.role}
            ref={(c) => { role = c; }} required="required" />
          <label className="label-control">Github <i className="fa fa-github" aria-hidden="true"></i></label>
          <input type="text"  defaultValue={user.github} ref={(c) => { github = c }} placeholder="Github handle e.g. defunk" className="form-control" required="required" />
          <label className="label-control">Twitter <i className="fa fa-twitter" aria-hidden="true"></i></label>
          <input type="text"  defaultValue={user.twitter} ref={(c) => { twitter = c }} placeholder="Twitter handle e.g. POTUS" className="form-control" required="required" />
          <label className="label-control">LinkedIn <i className="fa fa-linkedin" aria-hidden="true"></i></label>
          <input type="text"  defaultValue={user.linkedin} ref={(c) => { linkedin = c }} placeholder="Linked In profile link e.g. https://in.linkedin.com/in/tejpochiraju" className="form-control" required="required" />
          <label className="label-control">About</label>
          <textarea name=""  defaultValue={user.about} ref={(c) => { about = c }} className="form-control" rows="6"></textarea>

          <div className="col-md-12 pad-0" style={{marginTop: '20px'}}>
            <label type="text" className="label-control col-md-12 pad-0">Select your skills</label>
            <div className="clearfix"/>
            {allSkills.map((skill, i) => {
              let selected = skills.indexOf(skill._id.toString()) === -1 ? false : true;
              return (
                <div className="skill-card" key={i}>
                  <SkillMicroCard selected={selected} skill={skill} toggleSkill={toggleSkill} />
                </div>
              )
            })}
          </div>
          <div className="col-md-12">
            <div className="text-center">
              <button className="btn" onClick={updateProfile}>
                {props.savingUser ? 'Saving . . .' : 'Save' }
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProfileForm;
