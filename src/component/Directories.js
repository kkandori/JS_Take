import React from "react";
import Request from 'react-http-request';
import { Link,browserHistory,Router } from "react-router";

export default class Directories extends React.Component{

  generateDirectoriesFiles (tt){
    const rows = [];
    var uu = JSON.parse(tt).Directories;
    var ff = JSON.parse(tt).Files;

    if (uu.length > 0) {
      //console.log(this.props);
      //rows.push(<h4><b> --Directories------------------ </b></h4>);

      rows.push(<DirectoryNamesRow key={uu.length} directories={uu} params={this.props} />);
    }
    if (ff.length > 0) {
      //rows.push(<h4><b> --Files------------------ </b></h4>);
      //console.log(ff);
      rows.push(<FileNameRow key={ff.length} files={ff} params={this.props}/>);
    }
    return rows;
  }

  render(){
    const { params }  = this.props;
    const { state }  = this.props.location;
    const { directories } = params;
    const { project } = params;
    const { agent }  = params;
    const { treeID }  = params;

    const { apiServer } = state;
    const { index } = state;
    const { token } = state;
    const { pathname } = state;

    var directory_url = 'https://' + apiServer + '/api/dirlist/agents/'+ index + '/dirs/' + treeID + '/page/0' + '?token='+ token;
    //console.log(directory_url);

//<Link to={browserHistory.goBack}> ..... </Link>
    return (
        <div>
          <h4>Directories page.</h4>

          <Request
            url={directory_url}
            method='get'
            accept='application/json'
            verbose={false}>
            {
              ({error, result, loading}) => {
                if (loading) {
                  return <div>loading...</div>;
                } else {
                  var tt = JSON.parse(JSON.stringify(result)).text;
                  return <div>
                  {
                    this.generateDirectoriesFiles(tt)
                  }</div>;
                }
              }
            }
          </Request>
        </div>
    );
  }
}

// <Link to={`/viewer/${this.props.param.project}/${this.props.param.agent}/${obj.TreeID}`} state={{ index, apiServer, token }}>{i}:{obj.DirectoryName}
// </Link>

class DirectoryNamesRow extends React.Component {

  render(){
    const { params } = this.props.params;
    const { state } = this.props.params.location;
    const { agent } = params;
    const { project } = params;
    const { treeID } = params;
    const { apiServer } = state;
    const { index } = state;
    const { token } = state;

    return (
      <div class="directory">{
      this.props.directories.map((obj,i) =>
        <li key={obj.DirectoryName}>
           <Link to={`/viewer/${project}/${agent}/${obj.TreeID}`} state={{ index, apiServer, token }}>{obj.DirectoryName}
           </Link>
        </li>)
      }</div>
    )
  }
}

// <Link to={`/viewer/${this.props.param.project}/${agent}/${obj.TreeID}`} state={{ index, apiServer, token }}>{obj.FileName}
// </Link>

class FileNameRow extends React.Component {
  render(){
    const { params } = this.props.params;
    const { state } = this.props.params.location;
    const { agent } = params;
    const { project } = params;
    const { treeID } = params;
    const { apiServer } = state;
    const { index } = state;
    const { token } = state;
    //console.log(this.props);

    return (
      <div class="file">{
        this.props.files.map((obj,i) =>
          <li key={obj.FileName}>
            <Link to={`/viewer/${project}/${agent}/${treeID}/${obj.Index}`} state={{ index, apiServer, token }}>{obj.FileName}
            </Link>
          </li>)
      }
      </div>
    )
  }
}




// uu.map((obj,i) =>
//   <li key={i}>
//     <Link to={`/viewer/${project}/${agent}/${obj.TreeID}`} state={{ index, apiServer, token }}>{obj.DirectoryName}
//     </Link>
//   </li>)
