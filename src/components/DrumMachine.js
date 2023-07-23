import React from "react";

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: 'None',
      isEnabled: true,
      drumPads: [
        { id: "pad1", letter: "Q", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', description: 'Heater 1' },
        { id: "pad2", letter: "W", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', description: 'Heater 2' },
        { id: "pad3", letter: "E", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', description: 'Heater 3' },
        { id: "pad4", letter: "A", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', description: 'Heater 4' },
        { id: "pad5", letter: "S", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', description: 'Clap' },
        { id: "pad6", letter: "D", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', description: 'Open-HH' },
        { id: "pad7", letter: "Z", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', description: 'Kick-n\'-Hat' },
        { id: "pad8", letter: "X", sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', description: 'Kick' },
        { id: "pad9", letter: "C", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', description: 'Closed-HH' },
      ]
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    const pads = document.querySelectorAll('.drum-pad');
  }

  removeActiveClass(event) {
    event.target.classList.remove('active');
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    const pads = document.querySelectorAll('.drum-pad');
    pads.forEach(pad => pad.removeEventListener('transitionend', this.removeActiveClass));
  }

  componentDidUpdate(prevProps, prevState) {
    const pads = document.querySelectorAll('.drum-pad');
    pads.forEach(pad => {
      pad.removeEventListener('transitionend', this.removeActiveClass);
      pad.addEventListener('transitionend', this.removeActiveClass);
    });
  }
  
  handleClick(event) {
    event.preventDefault();
    const id = event.target.childNodes[1].id;
    const target = event.target;
    const clickedPad = this.state.drumPads.find(pad => pad.letter === id);
    if (this.state.isEnabled && clickedPad) {
      const audio = document.getElementById(id);
      audio.play();  
      this.setState({ displayText: clickedPad.description });
      target.classList.add('active');
    }
  }
  
  handleKeyPress(event) {
    const key = event.key.toUpperCase();
    const pad = this.state.drumPads.find(pad => pad.letter === key);
    if (this.state.isEnabled && pad) {
      const audio = document.getElementById(pad.letter);
      const padElement = document.querySelector(`#${pad.id}`);
      audio.play();
      this.setState({ displayText: pad.description });
      padElement.classList.add('active');
    }
  }

  handleVolumeChange(event) {
    const volume = event.target.value;
    const clips = Array.from(document.getElementsByClassName('clip'));
    clips.forEach((clip) => {
      clip.volume = volume / 100;
    })
  }

  handleSwitchChange(event) {
    this.setState({isEnabled: event.target.checked});
  }

  render() {
    return (
      <div id="drum-machine">
        <header>
          <h1>Drum Machine</h1>
          <p>Click these buttons or press the associated keys to play sounds</p>
        </header>
        <div id="mainPanel">
          <div id="leftPanel">
            {this.state.drumPads.map(pad => 
              <button id={pad.id} className="drum-pad" key={pad.letter} onClick={this.handleClick} >
                {pad.letter}
                <audio src={pad.sound} className="clip" id={pad.letter} />
              </button>  
            )}
          </div>
          <div id="rightPanel">
            <div id="switch-container">
              Power:
              <div className="switch">
                <input type="checkbox" id="switch" checked={this.state.isEnabled} onChange={this.handleSwitchChange} />
                <label htmlFor="switch"><span></span></label>
              </div>
            </div>
            <div id="volume-control">
              <label htmlFor="volume-slider">Volume: </label>
              <input type="range" id="volume-slider" min="0" max="100" step="1" defaultValue="100" onChange={this.handleVolumeChange} />
            </div>
            <div id="display">
              <label htmlFor="audio-sample">Audio sample:  </label>
              {this.state.displayText}
            </div>
          </div>
        </div>
        <footer>
          <p>Created by ZiLong Wang</p>
        </footer>
      </div>
    )
  }
}

export default DrumMachine;