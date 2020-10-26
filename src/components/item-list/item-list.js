import React, { Component } from 'react';
import swapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

  swapiService = new swapiService();

  state = {
    peopleList: null
  }

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemsSelected(id)}>
          {name}
        </li>
      );
    });
  }

  componentDidMount() {
    this.swapiService.getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList
        });
      })
      .catch(err => console.log(err));
  }

  render() {

    const { peopleList } = this.state;

    if (!peopleList) {
      return (
        <Spinner />
      );
    }
    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
