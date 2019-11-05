import React, { Component } from 'react';
import SliderCommand from './SliderCommand';

class WheelSpeed extends Component {

  allStop = () => {
    this.refs.left.setValue(0);
    this.refs.right.setValue(0);
    this.props.robot.command.wheelSpeeds(0, 0);
  }

  setBoth = () => {
    this.props.robot.command.wheelSpeeds(this.refs.left.getValue(), this.refs.right.getValue());
  }

  render() {
    return (
      <div>
        <SliderCommand name='Left Wheel Speed' min='-80' max='80' ref='left' units='cm/s'/>
        <br />
        <SliderCommand name='Right Wheel Speed' min='-80' max='80' ref='right' units='cm/s'/>
        <br />
        <button onClick={this.setBoth}>Send Both Wheel Speeds</button>
        <button onClick={this.allStop}>Send All Stop</button>
      </div>
    )
  }
}


export default WheelSpeed;
