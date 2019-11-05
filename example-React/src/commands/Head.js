import React, { Component } from 'react';
import SliderCommand from './SliderCommand';


class Head extends Component {

  render() {
    const command = this.props.robot.command;

    return (
      <div>
        <SliderCommand name='Head Pan' min='-130' max='130' command={command.headPan} />
        <br />
        <SliderCommand name='Head Tilt' min='-24' max='13' command={command.headTilt} />
      </div>
    )
  }
}

export default Head;
