import React, {Component} from 'react';
import swapiService from '../../services/swapi-service';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';


import './app.css';

export default class App extends Component {
  swapiService = new swapiService();
  render() {
    return (
      <div>
        <Header />
        <RandomPlanet />
        <PeoplePage />
      </div>
    );
  }
};