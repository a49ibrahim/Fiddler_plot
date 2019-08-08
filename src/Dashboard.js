import React from 'react';
import loanData from './loanData';
import scatterPlot from './scatterPlot';

const Dashboard = (props) => {
	return (
		<div classname ='Dashboard'>
			<h1>Dashboard 🖥</h1>

			{/* view of Dashboard*/}
			<div className = 'plot-container'>
			{props.savedPlots.length > 0
			? props.savedPlots.map((pair, index) => (
			<div className='plot' key={index} >
			<div className='scatterplot'>
				<scatterPlot data={loanData}
				pair ={pair} key = {index}/>
				</div>
				</div>))
				: <h4>There are currently no saved plots.</h4>
				}
			</div>
		</div>
	);
}
export default Dashboard;
