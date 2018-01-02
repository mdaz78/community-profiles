import React from 'react';

const SkillForm = (props) => {
  let name;
  let description;
  let logo;

  const addNewSkill = (e) =>  {
    e.preventDefault();
    if (!name && !name.value) {
      return;
    }

    name = name.value;
    description = description.value;

    let data = { name, description };

    if (typeof logo == 'string' && logo) {
      data.logo = logo;
    }

    props.addNewSkill(data);
  }

  const changeLogo = (e) => {
    var file = document.getElementById('skillLogoUpload').files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      logo = e.target.result;
      document.getElementById('skillLogo').setAttribute('src', logo);
    };
    reader.readAsDataURL(file);
  }

  const triggerUploadLogo = (e) => {
    e.preventDefault();
    document.getElementById('skillLogoUpload').click();
  }

  const updateSkill = (e) =>  {
    e.preventDefault();
    if (!name && !name.value) {
      return;
    }

    name = name.value;
    description = description.value;

    let data = { name, description };

    if (typeof logo == 'string' && logo && (logo !== props.skill.logo)) {
      data.logo = logo;
    }

    props.updateSkill(data);
  }

  let skill = props.skill || { name: '', description: '' };

  return (
    <div className="col-sm-10 col-sm-offset-1 admin-form margin-top profile-form">
      <div className="col-sm-4 col-md-3 text-center" style={{"paddingLeft":"0"}}>
        <div className="upload-logo">
          <div className="chose-logo">
            <img src={skill.logo || "/images/camera.png"} id="skillLogo" className="img-responsive" alt="" />
            <div className="change-logo" onClick={triggerUploadLogo}>
              <span className="glyphicon glyphicon-camera"></span>
            </div>
            <input type="file" onChange={changeLogo} style={{display: 'none'}} id="skillLogoUpload" />
          </div>
        </div>
      </div>
      <div className="col-sm-8 col-md-9" style={{"paddingRight":"0"}}>
        <label className="label-control">Skill Name</label>
        <input type="text" id="input" className="form-control" defaultValue={skill.name} ref={(c) => { name = c; }} required="required" />
        <label className="label-control">Description</label>
        <textarea name="" id="input" className="form-control" defaultValue={skill.description} ref={(c) => { description = c; }} rows="5" required="required"></textarea>
      </div>
      <div className="col-md-12">
        <div className="text-center">
          <button className="btn" onClick={props.edit ? updateSkill : addNewSkill}>{props.edit ? 'Update' : 'Create'}</button>
        </div>
      </div>
    </div>
  );
}

export default SkillForm;

