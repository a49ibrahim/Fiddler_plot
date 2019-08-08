import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Generate from './Generate';
import Dashboard from './Dashboard';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			savedPlots: [],
		};
		this.updateSavedPlots = this.updateSavedPlots.bind(this);
	}
	updateSavedPlots(savedPlots){
		this.setState( savedPlots);
	}
	render(){
		return(
			<Router>
				<div className='App'>
				<Nav />
					<Switch>
						<Route exact path="/" render={props =>
						<Generate savedPlots={this.state.savedPlots}
						setSavedPlots ={this.updateSavedPlots} /> }/>

						<Route path='/dashboard' render={props =>
						<Dashboard savedPlots={this.state.savedPlots}/>} />
						<Route render={function () {
							return <p>404 Page Not Found </p>
						}} />
						//}
					</Switch>
				</div>
			</Router>
		);
	}

}

export default App;
