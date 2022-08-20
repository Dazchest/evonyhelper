import React, { Component } from "react";
import { formatTime } from "../../helpers";

let minutesTargets = [50000, 100000, 250000, 500000, 1000000];

export class Minutes extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        let minutesAchieved = this.props.minutesAchieved
        let left = 0;
        return(
            <div>
                <h3>Minutes Achieved</h3> 
                <input onChange={this.props.onChange} value={minutesAchieved} type="number" />  
                
                {minutesTargets.map((item, index) => {
                    return(
                        <li key={index}>Target - {item} Still to go - 
                        {item - minutesAchieved > 0 ? left=item - minutesAchieved : left = 0}
                         - which is {formatTime((left) * 60)}
                        
                        </li>
                    )
                })}
                
            </div>
        )
    }


}