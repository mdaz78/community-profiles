import React, { Component } from 'react';

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  render() {
    return (
      <div className="post-view post">
        <div className="post-head">
          <div className="post-person">
            <img src="images/jon.jpg" className="img-responsive" alt=""/>
            <div className="person-details">
              <h4>Jon Snow</h4>
              <small>Front End Developer</small>
            </div>
          </div>
          <div className="parent-circle">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
        <h4 className="post-title">Found this on web and could not find a better place to share this.</h4>
        <div className="post-body">
          <p>Lorem ipsum Duis Excepteur in eu dolore dolor magna fugiat consectetur in culpa do in 
          sunt non officia consectetur adipisicing sed mollit labore officia magna velit proident 
          occaecat in ea Excepteur incididunt aliqua mollit officia consectetur incididunt ullamco 
          mollit culpa consectetur mollit culpa esse Duis elit officia aliqua consectetur Ut 
          consectetur sed labore dolor irure deserunt laboris commodo in incididunt sunt ullamco 
          laborum occaecat sit laboris aute aute ut occaecat consequat non ad enim est eiusmod minim 
          ut sed dolor Excepteur voluptate in labore in amet eiusmod ad culpa in laborum Ut elit ea 
          consectetur tempor pariatur officia minim qui proident Excepteur consectetur pariatur 
          laborum reprehenderit in officia est Duis consectetur Excepteur dolor enim ut ut est do 
          reprehenderit eu occaecat eiusmod anim in magna incididunt aliqua consectetur reprehenderit 
          t elit in aliqua nisi cillum nisi eu consectetur est magna esse eu qui commodo dolor velit 
          aliqua quis nulla reprehenderit adipisicing Ut cillum sed mollit qui et in eiusmod anim dolore 
          lamco consequat dolore sint cupidatat dolor aliquip incididunt sit anim Excepteur sint proident 
          laboris labore aute dolore deserunt sint nisi in et exercitation officia pariatur esse Excepteur
          ad in cupidatat sint anim reprehenderit ex dolore culpa elit officia sed ut dolor dolore laborum
          sunt ex mollit Excepteur aute pariatur amet voluptate quis Excepteur consectetur do voluptate 
          ullamco eiusmod esse culpa cupidatat nisi velit velit occaecat minim ullamco.</p>
        </div>
        <div className="post-footer">
          <div className="reply">
            <i className="fa fa-reply" aria-hidden="true"></i><sup>6</sup>
          </div>
          <i className="fa fa-expand" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

