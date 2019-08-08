import React from 'react';
import loanData from './loanData';

import ScatterPlot from './ScatterPlot';

class Generate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedX: "",
            selectedY: "",
            curPlots: [],
        };

        this.handleSelectedX = this.handleSelectedX.bind(this);
        this.handleSelectedY = this.handleSelectedY.bind(this);
        this.generatePlot = this.generatePlot.bind(this);
    }

    // selection form handler functions
    handleSelectedX(e) {
        this.setState({ selectedX: e.target.value });
    }

    handleSelectedY(e) {
        this.setState({ selectedY: e.target.value });
    }

    // generating a new plot through thehandler function 
    generatePlot(e) {
        e.preventDefault();
        const newPlot = { // object stores x and y
            x: this.state.selectedX,
            y: this.state.selectedY
        }
        this.setState(state => ({ // adds newPlot object to curPlots array
            curPlots: state.curPlots.concat(newPlot),
            selectedX: "",
            selectedY: ""
        }));
    }

    // saves a generated plot to dashboard through handler function 
    savePlot(index, e) {
        e.preventDefault();
        // updates state in parent component
        this.props.setSavedPlots({ savedPlots: this.props.savedPlots.concat(this.state.curPlots[index]) });
    }

    render() {
        return (
            <div>
                <h1> Generate Scatter Plot 📈</h1>
                {/* rows of loan data ready for plotting */}
                <p>Select any pair of columns for x and y to be plotted.</p>

                {/* generate plot form*/}
                <form onSubmit={this.generatePlot}>
                    x:<select
                        name="x"
                        value={this.state.selectedX}
                        onChange={this.handleSelectedX}
                        required>
                        {/*  excludes strings by filtering to onlu numbers*/}
                        {Object.keys(loanData[0]).filter(word => typeof(loanData[0][word]) === "number").map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                    <br/>
                    y:<select
                        name="y"
                        value={this.state.selectedY}
                        onChange={this.handleSelectedY}
                        required>
                        {/* .filters out strings and leaves only possible numbers*/}
                        {Object.keys(loanData[0]).filter(word => typeof(loanData[0][word]) === "number").map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                    <br/>
                    <button type="submit">Generate Plot</button>
                </form>

                {/* Generates current plot views*/}
                <div className="plot-container">
                    {this.state.curPlots.length > 0
                        ? this.state.curPlots.map((pair, index) => (
                        <div className="plot" key={index}>
                            <div className="scatterplot">
                                <button onClick={this.savePlot.bind(this, index)}>save</button>
                                <ScatterPlot data={loanData} pair={pair}/>
                            </div>
                        </div>))
                        : <h4>No plots have been generated thus far.</h4>
                    }
                </div>
            </div>
        )
    }
}

export default Generate;