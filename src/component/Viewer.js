import React from "react";
import Request from 'react-http-request';
import _ from 'lodash';
import { Link } from "react-router";

import Projects from "./Projects"

export default class Viewer extends React.Component{
  constructor() {
    super();
    this.state = {
      ProjectName : ["aaaa","bbbb","cccc","dddd"],
      projectList : [],
      token : "cECAbbJYn0r3aD4U7K8j7fMqjyxLEqMfzPDyKPln7l1NgODKNWekN2Lz9Ull97i46FB7telcKr09Xa66s632zH68jroSZjKgeOEM5zEoKe6bK2Q21KKRMWKApDPa7eHg",
    };
  }

  render(){
    // var links = [];
    // for (var i=0; i<this.state.ProjectName.length; i++) {
    //   links[i] = '/viewer/' + this.state.ProjectName[i];
    // }
    const {token} = this.state;

    var project_url = 'https://viewer.nexon.net:9988/api/projects?token='+ token;

    //console.log(this.props);
    return (
        <div>
          <h4> Viewer page. </h4>
          {
            // _.times(this.state.ProjectName.length, i =>
            //   <Link to={links[i]} key={this.state.ProjectName[i]} > {this.state.ProjectName[i]} </Link>
            // )
          }

          <Request
            url={project_url}
            method='get'
            accept='application/json'
            verbose={true}>
            {
              ({error, result, loading}) => {
                if (loading) {
                  return <div>loading...</div>;
                } else {
                  //var tt = JSON.stringify(result);
                  var tt = JSON.parse(JSON.parse(JSON.stringify(result)).text);
                  //var projectList = []

                  // JSON.parse(JSON.parse(JSON.stringify(result)).text).map(function(n){
                  //   projectList +=  ('<li>' + n.ProjectName + '</li>');
                  // })
                  const projectList = tt.map(obj => obj.ProjectName).sort();
                  //this.setState({projectList:tt});

                  // for (var i=0; i<kk.length; i++){
                  //   projectList += ('<li>' + kk[i].ProjectName + '</li>');
                  // }
                  //console.log(JSON.parse(JSON.parse(JSON.stringify(result)).text)[0]);

                  return <div>{
                    projectList.map(pn =>
                      <li key={pn}>
                        <Link to={`/viewer/${pn}`} state={{ token }}>{pn}
                        </Link>
                      </li>
                     )
                    //JSON.parse(JSON.parse(JSON.stringify(result)).text)
                    // JSON.stringify(result, function(k, v){
                    //   console.log( 'tt:' + v.ProjectName );
                    //console.log("projectname:" + tt)

                    // JSON.parse(result, function(key, value){
                    //   console.log("key:", key, "val : ", value);
                    //   return value.text;
                    // })
                  }</div>;
                }
              }
            }
          </Request>
        </div>
    );
  }
}
