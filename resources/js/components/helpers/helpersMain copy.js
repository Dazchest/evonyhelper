import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom";

import {Example, getAccounts, formatTime} from "../../helpers";
import {AddAccount, ChangeAccountName, ChangeAccountName2, ShowDeleteAccount} from "./account";

const Helpers = () => {

    return (
        <div className="container">
            <h1>Some helper functions</h1>

            {/* <MinutesConvert />
            <CalcBuildSpeed /> */}
        </div>
    )
}


export const MinutesConvert = (props) => {

    // this.state.m = 0;
    const [minutes, changeMinutes] = useState(0);

    // this.handleMinutesChange = this.handleMinutesChange.bind(this);

    function handleMinutesChange(e) {
        let newState = Object.assign({}, this.state);
        newState.m = e.target.value;
        this.setState(newState);
    }
            
    return (
        <div>
            <div className="card">
                <label>Convert minutes to, ermmm, something else</label>
                <input className="col-3" type="number" value={this.state.m} onChange={this.handleMinutesChange}/>
                <span>{formatTime(this.state.m * 60)}</span>
            </div>

        </div>
    )
}

// export class CalcBuildSpeed extends Component {

//     constructor() {
//         super();

//         this.handleSpeedChange = this.handleSpeedChange.bind(this);
//         this.handleTimeChange = this.handleTimeChange.bind(this);

//         this.state = {};
//         this.state.currentSpeed = 277;       // In percentage
//         this.state.currentTime = {"days": 540, "hours": 10, "minutes": 0};     // current time in {D,H,M}
//         this.state.currentMinutes = 70;
//         this.state.newSpeed = 300;
//         this.state.newTime = {"days": 0, "hours": 0, "minutes": 0};
//         this.state.newMinutes = 20;
//         this.state.timeSaved = 0;
//     }

//     handleSpeedChange(e) {
//         let speedType = e.target.attributes.speed.value;
//         this.setState({[speedType]: Number(e.target.value)}, this.updateMinutes);
//         console.log("changing speed " + speedType);
//     }

//     handleTimeChange(e) {
//         console.log("changing current time ", e.target.attributes.time.value);
//         let timeType = e.target.attributes.time.value;
//         let newState = Object.assign({}, this.state[timeType]);
//         newState[e.target.name] = Number(e.target.value);
//         this.setState({[timeType]: newState}, this.updateMinutes);
//     }

//     updateMinutes() {
//         let minutes =  Number((this.state.currentTime.days*60*24) + (this.state.currentTime.hours*60) + (this.state.currentTime.minutes));
//         this.setState({currentMinutes: minutes}, this.calcNewTime)
//     }

//     calcNewTime() {
//         let newMinutes = (this.state.currentMinutes * (1+(this.state.currentSpeed/100))) / (1+(this.state.newSpeed/100))
//         this.setState({newMinutes: newMinutes}, () => {
//             this.setState({timeSaved: this.state.currentMinutes - this.state.newMinutes});  
//         });
//         console.log("new miunutes = " + formatTime(newMinutes * 60));
//     }

//     render() {
//         return (
//             <>
//             <div className="card mt-2">
//                 <h2>Construction Speed</h2>
//                 <label>Input current build speed</label>
//                 <input className="col-3" type="number" speed="currentSpeed" value={this.state.currentSpeed} onChange={this.handleSpeedChange}/>
//                 <div className="input-group">
//                     days <input className="col-2" type="number" time="currentTime" name="days" value={this.state.currentTime.days} onChange={this.handleTimeChange}/>
//                     hours <input className="col-2" type="number" time="currentTime" name="hours" value={this.state.currentTime.hours} onChange={this.handleTimeChange}/>
//                     minutes <input className="col-2" type="number" time="currentTime" name="minutes" value={this.state.currentTime.minutes} onChange={this.handleTimeChange}/>
//                 </div>
//                 <span>t{formatTime(this.state.currentMinutes * 60)}</span>

//                 <label className="mt-2">Input new build speed</label>
//                 <input className="col-3" type="number" speed="newSpeed" value={this.state.newSpeed} onChange={this.handleSpeedChange}/>
//                 <h4>New Build Time is {formatTime(this.state.newMinutes * 60)}</h4>
//                 <h5>Thats a saving of {formatTime(this.state.timeSaved * 60)}</h5>
//             </div>
//             </>
//         )
//     }
// }

import { setDom } from "../../helpers.js";
setDom(Helpers, 'helpersroot');