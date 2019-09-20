import React, { Component } from 'react'
import LogConsole from 'react-log-console';
import data from './data';
console.log(data)
const logs = data.split(/\n/);

export default class App extends Component {
  logConsoleRef = React.createRef()

  componentDidMount = () =>{
    const timer = setInterval(() => {
      const log = logs.shift();
      this.logConsoleRef.push(log);
      if( logs.length<=0 ){
        clearTimeout(timer);
      }
    }, 200);
  }

  render () {
    return (
      <div style={{width: 800, height: 300, margin: '0 auto', position: 'relative',}} >
        <LogConsole ref={inst=> this.logConsoleRef = inst} />
      </div>
    )
  }
}
