import React, { Component } from 'react';
import WonderJS from 'wonderjs';

import SliderCommand from './SliderCommand';

class Sound extends Component {
  constructor() {
    super();
    this.state = {avatar: 'zest', sound: null};
  }

  avatarFilter = (avatar) => {
    return (sound) => (sound.name.substring(0, avatar.length) === avatar);
  }

  stripAvatar = (avatar) => {
    return (sound) => {
      const {file, desc} = sound;
      const strippedName = sound.name.substring(avatar.length+1);
      return {name: strippedName, file, desc};
    }
  }

  soundsForRobotType = (type) => {
    const avatar = this.state.avatar;
    return (type === 'Dot') ? WonderJS.wwMedia.WWSoundDot :
      (type === 'Dash') ? WonderJS.wwMedia.WWSoundDash :
      WonderJS.wwMedia.WWSoundCue.filter(this.avatarFilter(avatar)).map(this.stripAvatar(avatar));
  }

  optionsForRobotType = (type) => {  
      return this.soundsForRobotType(type).map(({name, file, desc}, index) => (
        <option value={file} key={index}>{name}</option>
      ));
  }

  avatarChanged = (event) => {
    this.setState({
      avatar: event.target.value,
      sound: null
    })
  }

  send = () => {
    this.props.robot.command.sound(this.refs.select.value, this.refs.volume.getValue());
  }

  soundForFile = (file) => {
    const matchingSounds = this.soundsForRobotType(this.props.robot.type)
      .filter((sound) => sound.file === file);
    if (matchingSounds.length === 0) {
      return null;
    }
    return matchingSounds[0];
  }

  soundChanged = (event) => {
    this.setState({
      sound : this.soundForFile(event.target.value)
    })
  }

  componentDidMount() {
    const soundFile = this.refs.select && this.refs.select.value;
    if (soundFile) {
      this.setState({
        sound : this.soundForFile(soundFile)
      });
    }
  }

  render() {
    const isCue = this.props.robot.type === 'Cue';

    return (
      <div>
        Sound:
        <SliderCommand name='Volume' min='0.01' max='1.0' ref='volume' defaultValue='1.0' step='0.01'/>
        <br />
        {
          isCue ?
          (<select ref='avatar' onChange={this.avatarChanged} value={this.state.avatar}>
            <option value='charge'>Charge</option>
            <option value='pep'>Pep</option>
            <option value='smirk'>Smirk</option>
            <option value='zest'>Zest</option>
          </select>) : null
        }
        <select ref='select' onChange={this.soundChanged}>
          {this.optionsForRobotType(this.props.robot.type)}
        </select>
        <br />
        <i>{this.state.sound && this.state.sound.desc}</i>
        <br />
        <button onClick={this.send}>Send Sound Command</button>
      </div>
    )
  };
}

export default Sound;