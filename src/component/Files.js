import React from "react";
import Request from 'react-http-request';
import Websocket from 'react-websocket';

export default class Files extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tails: ""
    };
  }

  socketHandling(data){
    var result = JSON.parse(data);
    this.setState({tailes:result});
  }
  render(){
    const { params }  = this.props;
    const { state }  = this.props.location;
    const { directories } = params;
    const { project } = params;
    const { agent }  = params;
    const { treeID }  = params;
    const { fileID }  = params;

    const { apiServer } = state;
    const { index } = state;
    const { token } = state;
    const { pathname } = state;

    //console.log(this.props);

    var file_url = 'https://' + apiServer + '/api/tail/agents/' + index + '/dirs/' + treeID + '/files/' + fileID + '?token='+ token;
    //var websocketaddr = "";
    var websocketaddr = 'wss://10.8.200.16:25000/agents/143/tree/000000001/tail/0';
    // var ws = new WebSocket('wss://10.8.200.16:25000/agents/143/tree/000000001/tail/0');
    //
    // ws.onopen = () => {
    //   ws.send('WebSocket rocks');
    // }
    //
    // ws.onmessage = (e) => {
    //   this.setState({tailes:e.data});
    //   //console.log(e.data);
    // }
    // ws.onclose = (e) => {
    //   //console.log(e.code, e.reason);
    // }

    return (
        <div>
          <h4> Files page. </h4>
          tails : [{this.state.tails}]
          <FileTails url={websocketaddr} msg='WebSocket rocks'/>
        </div>
    );
  }
}

class FileTails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: new WebSocket(this.props.url, this.props.protocol),
      attempts: 1,
      send_msg : this.props.msg
    };
  }

  componentDidMount(){
    console.log("DID");
    let websocket = this.state.ws;
    console.log(websocket);

    websocket.onopen = () => {
      //this.logging('Websocket connected');
      websocket.send(this.state.send_msg);
    };

    websocket.onmessage = (evt) => {
      //this.props.onMessage(evt.data);
      console.log(evt.data);
    };

    websocket.onclose = () => {
      //this.logging('Websocket disconnected');

      if (this.props.reconnect) {
        let time = this.generateInterval(this.state.attempts);
        setTimeout(() => {
          this.setState({attempts: this.state.attempts++});
          this.componentDidMount.bind(this);
        }, time);
      }
    }
  }

  componentWillUnmount() {
    console.log("WillUN");
    let websocket = this.state.ws;
    websocket.close();
  }

  render(){
    //console.log(this.states);
    return <div></div>;
  }
}

/*
<Websocket url='wss://10.8.200.16:25000/agents/143/tree/000000001/tail/0' onMessage={this.socketHandling.bind(this)} />

<Request
  url={file_url}
  method='get'
  accept='application/json'
  verbose={false}>
  {
    ({error, result, loading}) => {
      if (loading) {
        return <div>loading...</div>;
      } else {
        websocketaddr = JSON.parse(JSON.parse(JSON.stringify(result)).text).WebSocketAddr;
        console.log(websocketaddr);
        return <div>
          <Websocket url={websocketaddr} onMessage={this.socketHandling.bind(this)} />
        </div>;
      }
    }
  }
</Request>
*/
