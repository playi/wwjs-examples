import React, { Component } from 'react';
import SliderCommand from './SliderCommand';

class Pose extends Component {

  send = () => {
    this.props.robot.command.pose(
      this.refs.x.getValue(),
      this.refs.y.getValue(),
      this.refs.angle.getValue(),
      this.refs.time.getValue()
    );
  }

  render() {
    return (
      <div>
        <SliderCommand name='X' units='cm' min='-100' max='100' ref='x'/><br />
        <SliderCommand name='Y' units='cm' min='-100' max='100' ref='y'/><br />
        <SliderCommand name='Angle' units='degrees' min='-180' max='180' ref='angle'/><br />
        <SliderCommand name='Time' units='seconds' min='0.1' max='10.0' step='0.1' defaultValue='1.0' ref='time'/><br />
        <button onClick={this.send}>Send Pose Command</button>
      </div>
    )
  }
}

export default Pose;
