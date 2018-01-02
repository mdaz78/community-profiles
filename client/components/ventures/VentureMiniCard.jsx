import React from 'react';
import { Link } from 'react-router';

const VentureMiniCard = (props) => {
  return (
    <div className="img-card">
      <Link to={"/ventures/"+props.venture.slug} className="img-container">
        <div className="content">
          <div className="card-shot">
            <div className="card-img">
              <div className="img-container">
                <img src={props.venture.logo || "/images/venture.svg"} alt="" />
              </div>
              {/*{props.currentUser && (props.currentUser.admin || (props.venture.team.indexOf(props.currentUser._id) !== -1)) ?
                <Link to={"/ventures/edit/"+props.venture.slug}>
                  <span className="glyphicon glyphicon-pencil" />
                </Link>
              : null} */}
            </div>
            <div className="content-action">
              <h6>{props.venture.name.length > 13 ? props.venture.name.slice(0,13) + '...'  : props.venture.name }</h6>
              <div className="problem-statement">
                <p></p>
              </div>
              <div className="learn-more">
                <h6>Learn More</h6>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}


export default VentureMiniCard;

