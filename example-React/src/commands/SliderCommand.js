import React, { Component } from 'react';


class SliderCommand extends Component {
  constructor() {
    super();
    this.state = {value: null};
  }

  onSliderChange = () => {
    const value = this.refs.slider.value;
    this.setState({value});
  }

  send = () => {
    this.props.command(parseFloat(this.refs.slider.value));
  }

  setValue = (value) => {
    this.setState({value: 0});
    this.refs.slider.value = 0;
  }

  getValue = () => {
    return parseFloat(this.refs.slider.value);
  }

  componentWillMount() {
    if ((this.state.value === null) && this.props.defaultValue) {
      this.setState({value: this.props.defaultValue});
    } else {
      this.setState({value: 0});
    }
  }

  render() {
    const { name, min, max, defaultValue, step } = this.props;

    return (
      <div>
        {name}
        <input type='range' min={min} max={max} defaultValue={defaultValue} step={step} ref='slider' onChange={this.onSliderChange}/>
        &nbsp;{this.state.value}&nbsp;{this.props.units}&nbsp;
        {this.props.command && (<button onClick={this.send}>Send {name} command</button>)}
      </div>
    );
  }
}

export default SliderCommand;
