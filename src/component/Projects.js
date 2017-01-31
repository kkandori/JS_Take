import React from "react";
import Request from 'react-http-request';
import { Link } from "react-router";

export default class Projects extends React.Component{

  constructor() {
    super();
    // this.state = {
      //AgentName : ["lv7-gs01","lv7-gs02","lv7-gs03","lv7-gs04"],
    //   WebAPIAddr : "10.8.200.16:9980",
    // };
  }

   render(){
     const { params }  = this.props;
     const { token } = this.props.location.state;
     const { project } = params;
     const { agent }  = params;

     //console.log(this.state);

     var agent_url = 'https://viewer.nexon.net:9988/api/projects/'+project+'/agents?token='+token;

    //  var links = [];
    //  for (var i=0; i<this.state.AgentName.length; i++) {
    //    links[i] = '/viewer/' + project + '/' + this.state.AgentName[i];
    //  }

     //console.log(this.props);
     return (
         <div>
          <h4>Projects page. ({ project }, { agent })</h4>
            {
            //   _.times(this.state.AgentName.length, i =>
            //   <Link to={links[i]} key={this.state.AgentName[i]} > {this.state.AgentName[i]} </Link>
            // )
            }

            <Request
              url={agent_url}
              method='get'
              accept='application/json'
              verbose={true}>
              {
                ({error, result, loading}) => {
                  if (loading) {
                    return <div>loading...</div>;
                  } else {

                    var tt = JSON.parse(JSON.parse(JSON.stringify(result)).text).sort(function(a,b){
                      return +(a.AgentName > b.AgentName) || +(a.AgentName === b.AgentName) -1 ;
                    });
                    //const agentsList = tt.map(obj => obj.AgentName).sort();
                    // const agentsList = tt.map(function(obj){
                    //     return [obj.AgentName, obj.WebAPIAddr];
                    // });
                    // agentsList.map(an =>
                    //   <li key={an}><Link to={`/viewer/${project}/${an}`}>{an}</Link></li>
                    //  )

                    //console.log(tt);

                    return <div>{
                      tt.map(obj =>
                        <li key={obj.index.toString()}>
                          <Link to={`/viewer/${project}/${obj.AgentName}`} state={{ apiServer:obj.WebAPIAddr, index:obj.index, token }}>{obj.AgentName}
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
