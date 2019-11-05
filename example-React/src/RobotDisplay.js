import React, { Component } from 'react'

import CommandPicker from './CommandPicker'


class RobotDisplay extends Component {

  render() {
    const robot = this.props.robot;
    window.robot = robot; // for debugging

    return (<div>
      <hr />
      <b>Sensors</b>
      <pre>
        {JSON.stringify(this.props.sensors, null, 0)}
        {/* {Object.entries(this.props.sensors).map((kv,i) => {
          return (
            {kv[0]}:{JSON.stringify(kv[1], null, 0)}
            )
        })} */}
      </pre>
      <hr />
      <CommandPicker robot={robot} />
    </div>)

  }
}

export default RobotDisplay;
