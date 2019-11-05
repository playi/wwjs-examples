import React, { Component } from 'react';

import EyeRing from './commands/EyeRing';
import RGB from './commands/RGB';
import Head from './commands/Head';
import WheelSpeed from './commands/WheelSpeed';
import Sound from './commands/Sound';
import LinearAngular from './commands/LinearAngular';
import Pose from './commands/Pose';

const commandsForAllRobots = { EyeRing, RGB, Sound };
const commandsForWheeledRobots = { Head, WheelSpeed, LinearAngular, Pose };

class CommandPicker extends Component {
  constructor() {
    super();
    this.state = { selectedCommand: "EyeRing" };
  }

  optionForCommandName = (commandName) => {
    return (
      <option key={commandName} value={commandName}>{commandName}</option>
    )
  }

  selectionChanged = (event) => {
    this.setState({
      selectedCommand: event.target.value
    })
  }

  render() {
    const robot = this.props.robot;
    const isDot = (this.props.robot.type === 'Dot')
    const commands = isDot ? commandsForAllRobots : Object.assign({}, commandsForAllRobots, commandsForWheeledRobots)
    const commandNames = Object.keys(commands).sort()
    return (
      <div>
        <b>Command:</b>
        <select onChange={this.selectionChanged} value={this.state.selectedCommand}>
          {commandNames.map(cn => this.optionForCommandName(cn))}
        </select>
        {React.createElement(commands[this.state.selectedCommand], {robot})}
        {/* <EyeRing robot={robot} />
        <hr />
        <RGB robot={robot} /> */}
      </div>
    );
  }
}

export default CommandPicker;
