import React, { Component } from 'react';
import swapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './person-details.css';

export default class PersonDetails extends Component {

swapiService = new swapiService();
state = {
  person: {},
  loading: true,
  error: false
}
componentDidMount() {
  this.updatePerson();
}
onPersonLoaded = (person) => {
  this.setState({
    person,
    loading: false,
    error: false
  });
}
onError = () => {
  this.setState({
    error: true,
    loading: false
  });
}
updatePerson() {
  const { personId } = this.props;
  if (!personId) {
    return;
  }
  this.swapiService.getPerson(personId)
    .then(this.onPersonLoaded)
    .catch(this.onError);
}

componentDidUpdate(prevProps) {
  if (this.props.personId !== prevProps.personId) {
    this.updatePerson();
  }
}

  render() {
    if (!this.state.person) return <span>Select some person</span>

    const {person, loading, error} = this.state;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const hasData = !(errorMessage || spinner);
    const content = hasData ? <PersonView person={person}/> : null;

    return (
      <div className="person-details card">
        {spinner}
        {errorMessage}
        {content}
      </div>
    )
  }
}

const PersonView = ({ person }) => {
  const { id, name, gender,
    birthYear, eyeColor } = person;
  return (
    <React.Fragment>
        <img className="person-image" alt="Person's img"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  );
}
