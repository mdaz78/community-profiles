import React from 'react';
import * as actionCreators from '../../actions/index';
import * as actions from '../../actions/actions';

class EditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUpdated: false,
    };
    this.updateSprint = this.updateSprint.bind(this);
    this.removeModal = this.removeModal.bind(this);
  }

  updateSprint(e) {
    e.preventDefault();
    const description = document.getElementById('sprint-description').value;
    const category = document.getElementById('category-select').value;
    const dateTime = document.getElementById('datetime-select').value;

    if(!description || !category || !dateTime) {
      return alert('Description, Date and Category are must.');
    }

    this.props.dispatch(actionCreators.updateSprint({ sprintId: this.props.modals.info.sprint._id, description, category, dateTime })).then(() => {
      this.setState({ showUpdated: true });
      setTimeout(() => {
        this.props.dispatch(actions.hideModal());
      }, 400);
    });
  }

  removeModal() {
    this.props.dispatch(actions.hideModal());
  }

  render() {
    const sprint = this.props.modals.info.sprint;
    return (
      <div className="edit-modal">
        <div className="col-md-8 col-md-offset-2">
          <div className="edit-content">
            <textarea className="form-control" rows="8" id="sprint-description" defaultValue={this.props.modals.info.sprint.description} placeholder="Can somebody help us..." />
            <div className="remove" onClick={this.removeModal}>
              <div className="cross cross-1"></div>
              <div className="cross cross-2"></div>
            </div>
            <div className="help-us">
              <div className="post-tag">
                  <div className="tag tag-1">
                    <select className="form-control" id="category-select" defaultValue={sprint.category._id}>
                      {
                        this.props.skills.list.info.map((skill, i) => {
                          return (<option key={i} value={skill._id}>{skill.name}</option>);
                        })
                      }
                    </select>
                  </div>
              </div>
              <div className="when">
                <span>When?</span>
                <input type="date" className="form-control" id="datetime-select" defaultValue={this.props.modals.info.sprint.dateTime.slice(0,10)} />
              </div>
            </div>
            <div className="text-right post-btn">
              { this.state.showUpdated ? <span className="updated">Updated! ✔</span> : null }
              <button className="btn" onClick={this.updateSprint}>Update</button>
            </div>
          </div>
        </div>
        <div className="clearfix"/>
      </div>
    );
  }
};


export default EditModal;
