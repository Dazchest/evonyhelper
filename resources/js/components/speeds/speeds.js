import React, { Component } from "react";
import ReactDOM from "react-dom";
import SpeedQty from "./speedQty";
import {formatTime, getAccounts, AccountSelect, getData} from "../../helpers";

var speedData = [];
var speedTypes = ["Generic", "Construction", "Healing", "Research", "Training"];
var speedTimes = [5, 10, 15, 30, 60, 180, 480, 720, 1440, 4320];         // All in minutes

class Speeds extends Component {

    constructor() {
        super()

        this.state = {};

        speedData = this.init();
        this.handleChangeQty = this.handleChangeQty.bind(this);
        this.handleMinutesChange = this.handleMinutesChange.bind(this);
        this.m = 35

        this.state.acList = [];
        this.state.currentAc = 0;
        this.state.speedData = [];
        this.state.m = 0;
    }

    componentDidMount() {
        getAccounts()
            .then(acData => {
                if(acData.length) {
                    this.setState({acList: acData});
                    this.setState({currentAc: acData[0].id});

                    getData('speeds/get', this.state.currentAc, speedData, this.init)
                    .then(response => {
                        console.log("got data???", response);
                        this.setState({speedData: response});
                    }   
                    )
                } else {
                    console.log("found none");
                    this.setState({speedData: this.init(speedData)});
                }
            })
    }

    init() {
        let sData = [];
        speedTypes.forEach((type) => {
            let speed = {};
            speed.type = type;
            speed.total = 0;
            speedTimes.forEach((time) => {
                speed[time] = 0;
            })
            sData.push(speed);
        })
        return sData;
    }

    handleAcChange(e) {
        this.setState({currentAc: e.target.value})
        getData('speeds/get', e.target.value, speedData, this.init)
            .then(response => {
                console.log("got data after ac change", response);
                this.setState({speedData: response});
            }   
        );
    }

    handleChangeQty(e, type, speed) {
        console.log(type, speed)
        let newState = Object.assign({}, this.state);
        let i = speedTypes.indexOf(type);
        newState.speedData[i][speed] = Number(e.target.value);
        this.setState(newState, this.calcTotals);
    }

    calcTotals() {
        let newState = Object.assign({}, this.state);

        newState.speedData.forEach((speed, index) => {
            let total = 0;
            speedTimes.forEach((time) => {
                total += speed[time] * time;
            });
            newState.speedData[index].total = total;
        });

        this.setState(newState, this.saveValues());
        
    }

    saveValues() {
        let saveDelay = 2000;
        if(this.bob) {
            clearTimeout(this.bob);
        }
        this.bob = setTimeout(() => {
            console.log("timer");
            if(this.state.currentAc) {
                let data = this.state.speedData;
                const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
                // return;
                console.log("saving to ac ", this.state.currentAc);
                fetch(`speeds/store/${this.state.currentAc}`, {
                    method: 'POST',
                    headers: {
                        credentials: "same-origin",
                        "X-CSRF-Token": csrfToken,
                        mode: 'no-cors',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({data: data}),
                })
                    .then(response => response.text())
                    .then(response => {
                        console.log("saved  ........." + response);
                    })
            } else {
                console.log("not logged in, so not saving")
            }
        }, saveDelay);

    }


    handleMinutesChange(e) {
        let newState = Object.assign({}, this.state);
        newState.m = e.target.value;
        this.setState(newState);
    }

    render() {
        // let m = 0;
        return (
            <div className="card">
                <AccountSelect
                    currentAc = {this.state.currentAc}
                    acList = {this.state.acList}
                    onChange = {(e) => (this.handleAcChange(e))}
                />
                {this.state.speedData.map((speed, index) => {
                    return (
                        <SpeedQty
                            key = {index}
                            speedData = {speed}
                            speedTimes = {speedTimes}
                            onChangeQty = {this.handleChangeQty}
                        />
                    )
                })}
                <br />
                <div className="card">
                    <label>Convert minutes to, ermmm, something else</label>
                    <input className="col-3" type="number" value={this.state.m} onChange={this.handleMinutesChange}/>
                    <span>{formatTime(this.state.m * 60)}</span>
                </div>

            </div>
        )
    }
}

if(document.getElementById('speedsRoot')) {
    ReactDOM.render(<Speeds />, document.getElementById('speedsRoot'));
}


