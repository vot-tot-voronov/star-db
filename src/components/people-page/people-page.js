import React, {Component} from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import Row from '../row';
import swapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import './people-page.css';


export default class PeoplePage extends Component {
    swapiService = new swapiService();
    state = {
        selectedPerson: 1
    };
    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    }
    render() {
        const itemsList = (
            <ItemList onItemsSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}>
                {(i) => `${i.name} (${i.birthYear})`}
            </ItemList>
        );
        const personDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={this.state.selectedPerson} 
                    getData={this.swapiService.getPerson}
                    getImageUrl={this.swapiService.getPersonImage}/>
            </ErrorBoundry>
        );
        return(
            <Row left={itemsList} right={personDetails}/>
        );
    };
}