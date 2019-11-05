import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class RGB extends Component {

  sendRgb(commandFunction) {
    const { r, g, b } = this.refs.colorPicker.state.rgb;
    commandFunction(r, g, b);
  }

  render() {
    const command = this.props.robot.command;
    const hasEye = this.props.robot.type === 'Dot';
    const hasMain = this.props.robot.type === 'Cue';
    const hasChest = this.props.robot.type !== 'Dot'

    return (
      <div>
        <SketchPicker ref='colorPicker' disableAlpha={true}/>
        <button onClick={() => this.sendRgb(command.rgbAll)}>All</button>
        <button onClick={() => this.sendRgb(command.rgbEye)} disabled={!hasEye}>Eye</button>
        <button onClick={() => this.sendRgb(command.rgbLeftEar)}>Left Ear</button>
        <button onClick={() => this.sendRgb(command.rgbRightEar)}>Right Ear</button>
        <button onClick={() => this.sendRgb(command.rgbChest)} disabled={!hasChest}>Chest</button>
        <button onClick={() => this.sendRgb(command.rgbButtonMain)} disabled={!hasMain}>Button Main</button>
      </div>
    );
  }
}


export default RGB;
