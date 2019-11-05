import React, { Component } from 'react';
import SliderCommand from './SliderCommand';

class LinearAngular extends Component {
  allStop = () => {
    this.refs.linear.setValue(0);
    this.refs.angular.setValue(0);
    this.props.robot.command.linearAngular(0, 0);
  }

  setBoth = () => {
    this.props.robot.command.linearAngular(this.refs.linear.getValue(), this.refs.angular.getValue());
  }

  render() {
    return (
      <div>
        <SliderCommand name='Linear Speed' min='-80' max='80' ref='linear' units='cm/s'/>
        <br />
        <SliderCommand name='Angular Speed' min='-720' max='720' ref='angular' units='deg/s'/>
        <br />
        <button onClick={this.setBoth}>Send Linear Angular</button>
        <button onClick={this.allStop}>Send All Stop</button>
      </div>
    );
  }
}

export default LinearAngular;
