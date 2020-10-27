import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './item-details.css';

export default class ItemDetails extends Component {

state = {
  item: {},
  loading: true,
  error: false,
  image: null
}
componentDidMount() {
  this.updateItem();
}
onItemLoaded = (item) => {
  const { getImageUrl } = this.props;
  this.setState({
    item,
    loading: false,
    error: false,
    image: getImageUrl(item)
  });
}
onError = () => {
  this.setState({
    error: true,
    loading: false
  });
}
updateItem() {
  const { itemId, getData } = this.props;
  if (!itemId) {
    return;
  }
  getData(itemId)
    .then(this.onItemLoaded)
    .catch(this.onError);
}

componentDidUpdate(prevProps) {
  if (this.props.itemId !== prevProps.itemId) {
    this.updateItem();
  }
}

  render() {
    if (!this.state.item) return <span>Select some person</span>

    const {item, loading, error, image} = this.state;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const hasData = !(errorMessage || spinner);
    const content = hasData ? <PersonView person={item} image={image}/> : null;

    return (
      <div className="item-details card">
        {spinner}
        {errorMessage}
        {content}
      </div>
    )
  }
}

const PersonView = ({ person, image }) => {

  const { id, name, gender,
    birthYear, eyeColor } = person;
  return (
    <React.Fragment>
        <img className="person-image" alt="Person's img"
          src={image} />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender </span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year </span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color </span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  );
}
