import React, { Component } from 'react'
import WonderJS from 'wonderjs'

class RobotConnect extends Component {

  render() {
    const robot = this.props.robot;
    if (robot) {
      return (
      <div>
        Connected to a {robot.type} robot named <b>{robot.name}</b><br />
        <button onClick={() => WonderJS.disconnect(robot.id)}>Disconnect from {robot.name}</button> 
      </div>
      );
    } else {
      return (<button onClick={WonderJS.connect}>Connect!</button>)
    }
  }
}

export default RobotConnect;