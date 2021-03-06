import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import Header from './Header.jsx';

const getArtistInfo = callback => {
  axios
    .get (`/artists/${Math.floor (Math.random () * 99 + 1)}`)
    .then (response => {
      callback (response.data);
    })
    .catch (error => {});
};
const blackBG = {backgroundColor: '#191414'};

class App extends Component {
  constructor () {
    super ();
    this.state = {
      artistDisp: null,
    };
    this.handleFollowToggle = this.handleFollowToggle.bind (this);
  }

  componentDidMount () {
    getArtistInfo (responseData => {
      this.setState ({artistDisp: responseData});
    });
  }

  handleFollowToggle (event) {
    event.preventDefault ();
    this.setState (prevState => {
      return {
        artistDisp: {
          ...prevState.artistDisp,
          followed: !prevState.artistDisp.followed,
        },
      };
    });
  }

  render () {
    console.log ('in app render');
    const toRender = !!this.state.artistDisp
      ? <Header
          artist={this.state.artistDisp}
          handleFollowToggle={this.handleFollowToggle}
        />
      : <div className="placeHolder" />;
    console.log ('artistDisp', this.state.artistDisp);
    return <React.Fragment>{toRender}</React.Fragment>;
  }
}

export default hot (module) (App);
