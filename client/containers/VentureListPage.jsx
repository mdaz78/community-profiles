import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';
import VentureMiniCard from '../components/ventures/VentureMiniCard.jsx';
import Spinner from '../components/Spinner.jsx';

export default class VentureListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchVentures());
  }

  render() {
    return (
      <div className="wrapper margin-top">
        <div className="row">
          {this.props.ventures.list.loading ?
            <Spinner />
            :
            <div>
              {this.props.ventures.list.info.length > 0 ?
                this.props.ventures.list.info.map((item, i) => {
                  return (
                    <div key={i}>
                      <VentureMiniCard venture={item} currentUser={this.props.currentUser} />
                    </div>
                  );
                })
                :
                <div className="col-sm-12 col-md-12 text-center">No Ventures Listed.</div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

