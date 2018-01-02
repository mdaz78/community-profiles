import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actionCreators from '../../actions/index';

class SprintForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      category: '',
    };
    this.changeDescription = this.changeDescription.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.saveSprint = this.saveSprint.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actionCreators.fetchSkills());
  }

  changeDescription(e) {
    this.setState({ description: e.currentTarget.value });
  }

  changeCategory(e) {
    const id = e.currentTarget.value;
    this.setState({ category: id });
  }

  changeDate(e) {
    this.setState({ dateTime: e.currentTarget.value });
  }

  saveSprint(e) {
    e.preventDefault();

    const category = document.getElementById('select-category').value;

    if (!category) {
      return alert('Please select a category.');
    }

    if (!this.state.description) {
      return alert('Please fill in Description.');
    }

    if (!this.state.dateTime) {
      return alert('Please fill in Date.');
    }

    this.props.dispatch(actionCreators.createNewSprint({ description: this.state.description, dateTime: this.state.dateTime, category: category })).then(() => {
      this.setState({ dateTime: '', category: '', description: '' });
      document.getElementById('sprint-form').value = '';
    });
  }

  render() {
    return (
      <div className="request-input">
          <textarea className="form-control" rows="8" placeholder="Can somebody help us..." id='sprint-form' onChange={this.changeDescription} />
        <div className="help-us">
          <div className="post-tag">
              <div className="tag tag-1" data-id="planning">
                {/*<span className="glyphicon glyphicon-triangle-bottom"></span>*/}
                <select className="form-control" onChange={this.changeCategory} id='select-category' defaultValue={!this.props.skills.list.loading && this.props.skills.list.info.length > 0 && this.props.skills.list.info[0]._id}>
                  {
                    !this.props.skills.list.loading && this.props.skills.list.info.map((skill,i ) => {
                      return(<option key={i} value={skill._id} >{skill.name}</option>);
                    })
                  }
                </select>
              </div>
              {/*<div className={"tag tag-2"+(this.state.category == 'building' ? " active" : "")} data-id="building" onClick={this.changeCategory}>
                <span className="text-center">Building</span>
              </div>*/}
          </div>
          <div className="when">
            <span>When?</span>
            <input type="date" className="form-control" onChange={this.changeDate.bind(this)} />
          </div>
        </div>
        <div className="text-right post-btn">
          <button className="btn" onClick={this.saveSprint}>Post</button>
        </div>
      </div>
    );
  }
}

export default SprintForm;