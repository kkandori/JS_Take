import React from "react";
import ReactDOM from "react-dom";

import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";

import Layout from "./component/Layout";
import Viewer from "./component/Viewer";
import Projects from "./component/Projects";
import Agents from "./component/Agents";
import Directories from "./component/Directories";
import Files from "./component/Files";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={Layout}>
      <IndexRoute component={Viewer}></IndexRoute>
      <Route path="/viewer/(:project)" name="projects" component={Projects}></Route>
      <Route path="/viewer/(:project)/(:agent)" name="agents" component={Agents}></Route>
      <Route path="/viewer/(:project)/(:agent)/(:treeID)" name="directories" component={Directories}></Route>
      <Route path="/viewer/(:project)/(:agent)/(:treeID)/(:fileID)" name="files" component={Files}></Route>
      </Route>
  </Router>
  , app
);



//<Route path="/directories" name="directories" component={Directories}></Route>
//<Route path="agents/:directories" name="agents" component={Agents}></Route>
//<Route path="/viewer/(:project)/(:agent)/(:directory)/(:files)" name="projects" component={Projects}></Route>
