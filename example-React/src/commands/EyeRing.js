import React, { Component } from 'react'

class EyeCheckbox extends Component {

  render() {
    const img = this.props.lit ? 'whiteCircle.png' : 'grayCircle.png';
    return <img alt='eyeElement' src={img} style={this.props.style} onClick={this.props.onClick} />
  }
}

class EyeRing extends Component {
  constructor() {
    super();
    this.state = {
      containerRect: { left: 0, top: 0 },
      size: 100,
      checkSize: 45,
      margin: 25,
      lit: [0,1,0,1,1,1,1,1,1,1,0,1]
    }
  }

  onClick(i) {
    const lit = this.state.lit;
    lit[i] = 1-lit[i];
    this.setState({lit});
  }

  renderCheckbox(i) {
    const offsetLeft = this.state.containerRect.left + this.state.size - this.state.checkSize/2;
    const offsetTop = this.state.containerRect.top + this.state.size - this.state.checkSize/2;

    const radians = i * 2 * Math.PI / 12;
    const radius = this.state.size - this.state.margin;
    const left = offsetLeft + radius * Math.sin(radians);
    const top = offsetTop - radius * Math.cos(radians);

    const style = {
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      height: `${this.state.checkSize}px`,
      width: `${this.state.checkSize}px`,
      margin: 0,
    }
    return <EyeCheckbox key={i} style={style} ref={`eye${i}`} lit={this.state.lit[i]} onClick={() => this.onClick.bind(this)(i)} />
  }


  refCallback = element => {
    if (element) {
      const containerRect = element.getBoundingClientRect()
      const errLeft = this.state.containerRect ? Math.abs(containerRect.left - this.state.containerRect.left) : 0;
      const errTop = this.state.containerRect ? Math.abs(containerRect.top - this.state.containerRect.top) : 0
      if ((errLeft + errTop) > 0.001) {
        this.setState({ containerRect })
      }
    }
  }

  send() {
    this.props.robot.command.eyeRing(this.state.lit, 1.0);
  }

  render() {
    const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const style = {
      width: this.state.size * 2,
      height: this.state.size * 2,
      background: '#000'
    }

    return (
      <div>
        <div style={style} ref={this.refCallback.bind(this)}>
          {
            ids.map(id => this.renderCheckbox(id))
          }
        </div>
        <button onClick={this.send.bind(this)}>Send Eyering Command</button>
      </div>
    );

  }
}

export default EyeRing;
