import React from "react";
import Request from 'react-http-request';
import { Link } from "react-router";

export default class Agents extends React.Component{

  render(){
    //console.log(this.props);
    const { params }  = this.props;
    const { state }  = this.props.location;
    const { directories } = params;
    const { project } = params;
    const { agent }  = params;
    const { apiServer } = state;
    const { index } = state;
    const { token } = state;

    var directory_url = 'https://' + apiServer + '/api/dirlist/agents/'+ index +'/dirs/root' +'?token='+ token;

    return (
        <div>
          <h4>Agents page.({ project }, { agent }, {directories}, {apiServer})</h4>

          <Request
            url={directory_url}
            method='get'
            accept='application/json'
            verbose={true}>
            {
              ({error, result, loading}) => {
                if (loading) {
                  return <div>loading...</div>;
                } else {

                  var uu = JSON.parse(JSON.parse(JSON.stringify(result)).text).Directories;
                  //console.log(uu);

                  return <div>{
                    uu.map((obj,i) =>
                      <li key={i.toString()}>
                        <Link to={`/viewer/${project}/${agent}/${obj.TreeID}`} state={{ index, apiServer, token }}>{obj.DirectoryName}
                        </Link>
                      </li>
                     )
                  }</div>;
                }
              }
            }
          </Request>
        </div>
    );
  }
}
