import React from 'react';

const VentureForm = (props) => {
  let name;
  let problemStatement;
  let mvp;
  let team;
  let logo;
  let teamVal = '';

  const addNewVenture = (e) =>  {
    e.preventDefault();
    if (!name && !name.value) {
      return;
    }

    name = name.value;
    problemStatement = problemStatement.value;
    mvp = mvp.value;
    team = props.newVenture.team;
    logo = logo;

    let data = { name, problemStatement, mvp, team };

    if (typeof logo == 'string' && logo) {
      data.logo = logo;
    }

    props.addNewVenture(data);
  }

  const suggestTeamMembers = (e) => {
    props.suggestTeamMembers(team.value);
  }

  const changeLogo = (e) => {
    var file = document.getElementById('ventureLogoUpload').files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      logo = e.target.result;
      document.getElementById('ventureLogo').setAttribute('src', logo);
    };
    reader.readAsDataURL(file);
  }

  const triggerUploadLogo = (e) => {
    e.preventDefault();
    document.getElementById('ventureLogoUpload').click();
  }

  const addMember = (e) => {
    var id = e.currentTarget.getAttribute('data-id');
    var user;
    props.newVenture.suggestedMembers.forEach((member, i) => {
      if (member._id == id) {
        user = props.newVenture.suggestedMembers[i];
      }
    });
    props.newVenture.team.push(user);
    props.addAsSelectedMember(props.newVenture.team);
    document.getElementById('team-input').value = '';
  }

  const updateVenture = (e) => {
    e.preventDefault();
    if (!name && !name.value) {
      return;
    }

    name = name.value;
    problemStatement = problemStatement.value;
    mvp = mvp.value;
    team = props.newVenture.team;
    logo = logo;

    let data = { name, problemStatement, mvp, team };

    if (typeof logo == 'string' && logo && (logo !== props.newVenture.logo)) {
      data.logo = logo;
    }

    props.updateVenture(data);
  }

  const removeTeamMember = (e) => {
    var id = e.currentTarget.getAttribute('data-id');
    var user;
    props.newVenture.team.forEach((member, i) => {
      if (member._id == id) {
        user = i;
      }
    });
    props.newVenture.team.splice(user, 1);
    // same as remove because we are just updating entire team list.
    props.addAsSelectedMember(props.newVenture.team);
  }

  let venture = props.newVenture;

  return (
    <div className="col-sm-10 col-sm-offset-1 admin-form margin-top">
      <div className="col-sm-4 col-md-3 text-center" style={{"paddingLeft":"0"}}>
        <div className="upload-logo">
          <div className="chose-logo">
            <img src={venture.logo || "/images/camera.png"} className="img-responsive" id="ventureLogo" alt="" />
            <div className="change-logo" onClick={triggerUploadLogo}>
              <span className="glyphicon glyphicon-camera"></span>
            </div>
            <input type="file" onChange={changeLogo} style={{display: 'none'}} id="ventureLogoUpload" />
          </div>
        </div>
      </div>
      <div className="col-sm-8 col-md-9">
        <label className="label-control">Venture Name</label>
        <input type="text" id="input" className="form-control" defaultValue={venture.name} ref={(c) => { name = c }} required="required" />
        <label className="label-control">Problem Statement</label>
        <textarea name="" id="input" className="form-control" defaultValue={venture.problemStatement} ref={(c) => { problemStatement = c }} rows="5" required="required"></textarea>
      </div>
      <div className="col-md-12 venture-form">
        <label>What We Do</label>
        <textarea name="" id="input" className="form-control" defaultValue={venture.mvp} ref={(c) => { mvp = c }} rows="5" required="required"></textarea>
        <div className="team">
          <label>Team</label>
          <div className="team-list">
          {
            props.newVenture.team.map((user, i) => {
              return (
                <span key={i} data-id={user._id}><img src={user.image || "/images/jon.jpg"} className="img-responsive" alt=""/>
                  <small>{user.name}</small>
                  <i className="glyphicon glyphicon-remove" data-id={user._id} onClick={removeTeamMember} />
                </span>
              )
            })
          }
        </div>
          <input type="name" ref={(c) => { team = c; }} id="team-input" className="form-control" placeholder="Type your team member's name" onChange={suggestTeamMembers} />
        </div>
          <div className="team-dropdown">
            <ul>
              {
                props.newVenture.suggestedMembers.map((user, i) => {
                  if(props.newVenture.team.map((t) => t._id).indexOf(user._id) == -1 ) {
                    return <li key={i} data-id={user._id} onClick={addMember}>{user.name}</li>;
                  }
                  return;
                })
              }
            </ul>
          </div>
        <div className="text-center">
          <button className="btn"onClick={ props.edit ? updateVenture : addNewVenture}>{ props.edit ? 'Update' : 'Create' }</button>
        </div>
      </div>
      
    </div>
  )
}

export default VentureForm;