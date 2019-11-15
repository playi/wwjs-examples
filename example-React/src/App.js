import React, { Component } from 'react';
import WonderJS from '@wonderworkshop/wwjs';

import './App.css';

import RobotConnect from './RobotConnect';
import RobotDisplay from './RobotDisplay';

class App extends Component {
  constructor() {
    super();
    WonderJS.addEventListener("onconnect", robot => this.setState({robot}));
    WonderJS.addEventListener("ondisconnect", _ => this.setState({robot: null}));
    WonderJS.addEventListener("onsensor", ({id, sensors})  => this.updateSensors(id, sensors));
    this.state= {
      robot: null,
      sensors: null
    };
    window.WonderJS = WonderJS; // for debugging purposes
  }
  
  updateSensors = (robotId, sensors) => {
    window.sensors = sensors;
    const robot = this.state.robot;
    const currentRobotId = robot && robot.id
    if (robot && (robotId === currentRobotId)) {
      this.setState({robot, sensors});
      // this.setState({robot, sensors: JSON.stringify(sensors,null,0)});
    }
  }

  render() {
    const robot = this.state.robot;

    return (
      <div>
        <RobotConnect robot={robot}/>
        {robot && (<RobotDisplay robot={robot} sensors={this.state.sensors}/>)}
      </div>
      )
  }
}

export default App
