import React, { Component } from 'react'
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import ImagelinkForm from './Components/ImageLinkForm/Imagelinkform'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import ImageDisplay from './Components/ImageDisplay/ImageDisplay'

const app = new Clarifai.App({
  apiKey: '356113ee31f34bf697994b5475bd2a04'
});

const particleOptions = {

  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 300
      }
    },
    size: {
      value: 2
    },
    move: {
      enable: true,
      speed: 1.5
    }
  },

  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
}

let checkPress = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      ImageUrl: '',
      Box: {},
      name: ''
    };
  }

  displayCoordinates = (response) => {
    const data = response.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(data);
    const image = document.getElementById('image-element');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: (width - (data.right_col * width)),
      bottomRow: (height - (data.bottom_row * height))
    }
  }

  // getImageData = (event) => {
  //   this.setState({ boxWidth: event.target.width, boxHeight: event.target.height });

  // }
  FaceBox = (box, name) => {
    this.setState({ Box: box });
    console.log(this.state.Box);
    console.log(box.bottomRow);
    let celebrity_name=name.charAt(0).toUpperCase()+name.slice(1);
    this.setState({ name: celebrity_name });
    // console.log(this.state.name);
  }
  onInputChange = (event) => {
    // console.log(event);
    this.setState({ input: event.target.value });
  }
  handleKeyPress = (event) => {
   
    if (event.key === 'Enter') {
      checkPress = 1;
      console.log('enterPressed');
      this.setState({ ImageUrl: this.state.input });
      app.models.initModel({ id: Clarifai.CELEBRITY_MODEL })
        .then(generalModel => {
          return generalModel.predict(this.state.input);
        })
        .then(response => {
          //var concepts = response['outputs'][0]['data']['concepts']

          const name = response.outputs[0].data.regions[0].data.concepts[0].name;

          return this.FaceBox(this.displayCoordinates(response), name)
        }

        )
    }

  }
  onButtonSubmit = () => {
    checkPress = 1;
    this.setState({ ImageUrl: this.state.input });
    app.models.initModel({ id: Clarifai.CELEBRITY_MODEL })
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {
        //var concepts = response['outputs'][0]['data']['concepts']

        const name = response.outputs[0].data.regions[0].data.concepts[0].name;

        return this.FaceBox(this.displayCoordinates(response), name)
      }

      )
  }
  render() {
    if (checkPress) {
      return (
        <div>
          <Particles className="particle" params={particleOptions} />
          <Navigation />

          <ImagelinkForm
            Keypress={this.handleKeyPress}
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />

          <ImageDisplay box={this.state.Box} PersonName={this.state.name} ImageUrl={this.state.input} />

        </div>
      );
    }
    else {
      return (
        <div>
          <Particles className="particle" params={particleOptions} />
          <Navigation />

          <ImagelinkForm
            Keypress={this.handleKeyPress}
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit.bind(this)}
          />

          {/* <ImageDisplay ImageUrl={this.state.ImageUrl}/> */}

        </div>
      );
    }
  }
}
export default App;
