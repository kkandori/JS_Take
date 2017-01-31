import React from "react";
import { IndexLink, Link, browserHistory } from "react-router";

import Header from "./Header"
import Tails from "./Tails";

export default class Layout extends React.Component{
  navigate(){
    browserHistory.push('/');
    //browserHistory.replace('/');
    //console.log(this.props);
  }
  render(){
    const projects = ["pro1", "pro2", "pro3"];
    return (
      <div>
        <Header />

        <h1> Take1 </h1>
        This page is {this.props.children}

        <div>
          <Link to="/agents" class="btn btn-info">Agents</Link>
          <Link to="/directories" class="btn btn-danger">Directories</Link>
          <Link to="/files"><button class="btn btn-success">Files</button></Link>
          <IndexLink to="/"><button onClick={this.navigate.bind(this)} class="btn btn-warning">Viewer</button></IndexLink>
        </div>
        <Tails />
      </div>
    );
  }
}
