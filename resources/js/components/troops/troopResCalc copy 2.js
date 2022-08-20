import React from "react"
import ReactDOM from "react-dom";

import TroopQuantity from './troopQuantity';
import TroopJson from "./troops.json";
import {formatTime, getAccounts, getData, AccountSelect, LoadingSpinner, LSpinner} from '../../helpers';
import axios from "axios";

var troops = [];

var totals = {
    "food": 0,
    "wood": 0,
    "stone": 0,
    "iron": 0,
    "gold": 0,
    "time": 0,
    "power": 0,
    "qty": 0,
}
class TroopResCalc extends React.Component {

    constructor() {
        super();
        console.log(TroopJson);
        this.spreadsheetTroops = [];
        // this.compileTroopData();
        
        this.clear_totals = this.clear_totals.bind(this);
        this.calc_totals = this.calc_totals.bind(this);
        this.compileTroopData = this.compileTroopData.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.handleTroopQtyChange = this.handleTroopQtyChange.bind(this);
        this.handleTroopTypeChange = this.handleTroopTypeChange.bind(this);

        this.troopTypes = ["Ground", "Archers", "Cavarly", "Siege"];

        this.state = {
            troopQty: [],
            troops: [[]],
            troopInfo: TroopJson,
            currentTroopType: 0,
            totals: totals,
            // totals: [],
            allTotals: [],
            trainingSpeed: 0,
            dutyOfficerSpeed: 0,
            ac: [],
            currentAc: 0,
            isLoading: true,
        };
    }

    componentDidMount() {
        // this.setState({isLoading: false});
        // return;
        getAccounts().then(acData => {
            if(acData.length) {
                this.setState({ac: acData});
                this.setState({currentAc : acData[0].id})
                let accountId = acData[0].id;
                axios.get(`/troops/get/${accountId}`)
                    .then(response => {
                        if(response.data) {
                            let newState = response.data;
                            this.setState(newState);
                            this.setState({isLoading: false});
                        } else {
                            console.log("found no troops for this account, so init blank troops")
                            this.compileTroopData();
                            this.setState({isLoading: false});
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                        console.log(err.response.message);
                    })
            } else {
                console.log("found no accounts, so init blank troops");
                this.compileTroopData();
                this.setState({isLoading: false});
            }
        });
    }

    compileTroopData() {
        let troopData = JSON.parse(document.getElementById("troopData").getAttribute("data"));
        this.spreadsheetTroops = [];

        troopData.forEach((troopType, troopTypeIndex) => {
            let type = [];
            troopType.forEach((troop, index) => {
                if(index>0) {   // Don't include the header row
                    let newTroop = {}
                    newTroop.type = troop[0];
                    newTroop.tier = troop[2];
                    newTroop.food = troop[3];
                    newTroop.wood = troop[4];
                    newTroop.stone = troop[5];
                    newTroop.iron = troop[6];
                    newTroop.gold = troop[7];
                    newTroop.baseTime = troop[8];
                    newTroop.time = troop[8];
                    newTroop.power = troop[9] ? troop[9] : 0;
                    newTroop.qty = 0;
                    type.push(newTroop);
                }
            });
            this.spreadsheetTroops.push(type)
            troops.push(type)
        });
        troops[0][13].baseTime = 420;
        troops[0][13].time = 420;
        troops[1][13].baseTime = 420;
        troops[1][13].time = 420;
        troops[2][13].baseTime = 420;
        troops[2][13].time = 420;
        troops[3][13].baseTime = 420;
        troops[3][13].time = 420;

        this.setState({troops: this.spreadsheetTroops});
        this.setState({trainingSpeed: 0});
        this.setState({dutyOfficerSpeed: 0});
        this.setState({currentTroopType: 0});
    }

    handleSpeedChange(e) {
        let newState = Object.assign({}, this.state);
        let i = e.target.id;
        // newState.trainingSpeed = e.target.value;
        newState[i] = e.target.value;
        
        let s1 = newState.trainingSpeed;
        let s2 = newState.dutyOfficerSpeed;
        console.log(s1 + " - " + s2);
        // let speed = e.target.value;
        let speed = Number(s1) + Number(s2);

        newState.troops[this.state.currentTroopType].forEach(troop => {
            let baseTime = troop.baseTime;
            let time = baseTime / (1+(speed/100));
            troop.time = time;
        })

        this.setState(newState, this.calc_totals);
    }

    clear_totals() {
        console.log("clearing totals");

        let totals = this.state.totals;
        // console.log(totals);
        totals.food = 0;
        // console.log(totals);

    }

    calc_totals() {
        let newState = Object.assign({}, this.state);
        let newStateTotals = newState.totals;
        newStateTotals.food = 0;    // Reset totals to 0
        newStateTotals.wood = 0;    // Reset totals to 0
        newStateTotals.stone = 0;    // Reset totals to 0
        newStateTotals.iron = 0;    // Reset totals to 0
        newStateTotals.gold = 0;    // Reset totals to 0
        newStateTotals.time = 0;    // Reset totals to 0
        newStateTotals.power = 0;    // Reset totals to 0
        newStateTotals.qty = 0;    // Reset totals to 0

        let t = 0;
        let troops = newState.troops[this.state.currentTroopType];
        troops.forEach(troop => {
            newStateTotals.food += troop.food * troop.qty;
            newStateTotals.wood += troop.wood * troop.qty;
            newStateTotals.stone += troop.stone * troop.qty;
            newStateTotals.iron += troop.iron * troop.qty;
            newStateTotals.gold += troop.gold * troop.qty;

            t += troop.time * troop.qty;

            newStateTotals.power += troop.power * troop.qty;
            newStateTotals.qty += Number(troop.qty);
        });
        newStateTotals.time = t;

        this.setState(newState);

        let allTotalsState = [];
        newState.troops.forEach(troopType => {
            // allTotalsState.push([]);
            let typeData = {food:0, wood:0, stone:0, iron:0, gold:0, time:0, power:0, qty:0};
            troopType.forEach(troop => {
                // console.log(troop.food);
                typeData.type = troop.type;
                typeData.food += troop.food * troop.qty;
                typeData.wood += troop.wood * troop.qty;
                typeData.stone += troop.stone * troop.qty;
                typeData.iron += troop.iron * troop.qty;
                typeData.gold += troop.gold * troop.qty;
                typeData.time += troop.time * troop.qty;
                typeData.power += troop.power * troop.qty;
                typeData.qty += Number(troop.qty);
                // newState.time += troop.time * troop.qty;
                // t += troop.time * troop.qty;

                // newState.power += troop.power * troop.qty;
                // newState.qty += Number(troop.qty);
            });
            allTotalsState.push(typeData);
        });
        this.setState({allTotals: allTotalsState}, this.saveValues());

    }

    saveValues() {
        let saveDelay = 2000;
        if(this.bob) {
            clearTimeout(this.bob);
        }
        this.bob = setTimeout(() => {
            console.log("timer");
            if(this.state.currentAc) {
                let data = this.state;
                const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
                // return;
                console.log("saving to ac ", this.state.currentAc);
                fetch(`/troops/store/${this.state.currentAc}`, {
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

    handleTroopQtyChange(e, i) {
        let newState = Object.assign({}, this.state);
        newState.troops[this.state.currentTroopType][i].qty = e.target.value;
        this.setState(newState, () => {
            this.calc_totals();
        } );
    }

    handleTroopTypeChange(e) {
        let newState = Object.assign({}, this.state);
        newState.currentTroopType = e.target.value;
        this.setState(newState, 
            this.calc_totals
        );
    }


    handleAcChange(e) {
        this.setState({currentAc: e.target.value})
        let accountId = e.target.value
        getData("/troops/get", accountId).then(response => {
            if(response.troops) { 
                this.setState(response);
                console.log("found data");
            } else {
                console.log("found no data for this account, so calling compiletroopsdata");
                this.compileTroopData();
                this.setState({troops: this.spreadsheetTroops}, this.calc_totals);
            }
        });
    }


    render() {
        // return (<p></p>);
        let totals = this.state.totals;
        let typeTotals = {food:0, wood:0, stone:0, iron:0, gold:0, time:0, power:0, qty:0};

        if(this.state.isLoading) {
            return <LoadingSpinner />
        }

        return (
            <div className="card">
                <span>efweff</span>
                <AccountSelect
                    currentAc = {this.state.currentAc}
                    acList = {this.state.ac}
                    onChange = {(e) => (this.handleAcChange(e))}
                />
                <div className="input-group mb-3">
                    <div className="input-group-prepend col-3">
                        <div className="input-group-text col-12" id="btnGroupAddon">Tech Training Speed</div>
                    </div>
                    <input type="number" id="trainingSpeed" value={this.state.trainingSpeed} onChange={this.handleSpeedChange} className="form-control col-2" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend col-3">
                        <div className="input-group-text col-12" id="btnGroupAddon">Duty Bonus</div>
                    </div>
                    <input type="number" id="dutyOfficerSpeed" value={this.state.dutyOfficerSpeed} onChange={this.handleSpeedChange} className="form-control col-2" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend col-3">
                        <label className="input-group-text col-12" htmlFor="inputGroupSelect01">Troop Type</label>
                    </div>
                    <select className="custom-select col-2" value={this.state.currentTroopType} onChange={(e) => this.handleTroopTypeChange(e)} id="inputGroupSelect01">
                        <option value="0">Ground</option>    
                        <option value="1">Archers</option>    
                        <option value="2">Cavalry</option>    
                        <option value="3">Siege</option>    
                    </select>
                </div>

                <br/>

                <h2>{this.state.troops[this.state.currentTroopType][0].type}</h2>

                <table className="table-dark table-striped">
                    <thead>
                        <tr>
                            <th className="small" style={{width:'10%'}}>Tier</th>
                            <th className="small" style={{width:'15%'}}>Food</th>
                            <th className="small" style={{width:'15%'}}>Wood</th>
                            <th className="small" style={{width:'15%'}}>Stone</th>
                            <th className="small" style={{width:'15%'}}>Iron</th>
                            <th className="small d-none d-lg-table-cell" scope="col">Gold</th>
                            <th className="small d-none d-lg-table-cell">Time</th>
                            <th className="small d-none d-lg-table-cell">Power</th>
                            <th className="small" style={{width:'30%'}}>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.troops[this.state.currentTroopType].map((troop, index) => (
                            
                            <TroopQuantity key = {index} 
                                troop = {troop}
                                index = {index}
                                onTroopQtyChange = {this.handleTroopQtyChange}
                            />
                        ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="small"></th>
                            <th className="small">{formatTotal(totals.food)}</th>
                            <th className="small">{formatTotal(totals.wood)}</th>
                            <th className="small">{formatTotal(totals.stone)}</th>
                            <th className="small">{formatTotal(totals.iron)}</th>
                            <th className="small d-none d-lg-table-cell">{formatTotal(totals.gold)}</th>
                            <th className="small d-none d-lg-table-cell">{formatTime(totals.time)}</th>
                            <th className="small d-none d-lg-table-cell">{totals.power}</th>
                            <th className="small">{totals.qty}</th>
                        </tr>
                        <tr className="table-secondary"><td>space</td></tr>

                        {this.state.allTotals.map((rss, index) => {
                            typeTotals.food += rss.food;
                            typeTotals.wood += rss.wood;
                            typeTotals.stone += rss.stone;
                            typeTotals.iron += rss.iron;
                            return (
                                <tr key={index}>
                                    <td className="small">{rss.type}</td>
                                    <td className="small">{formatTotal(rss.food)}</td>
                                    <td className="small">{formatTotal(rss.wood)}</td>
                                    <td className="small">{formatTotal(rss.stone)}</td>
                                    <td className="small">{formatTotal(rss.iron)}</td>
                                    <td className="small d-none d-lg-table-cell">{formatTotal(rss.gold)}</td>
                                    <td className="small d-none d-lg-table-cell">{formatTime(rss.time)}</td>
                                    <td className="small d-none d-lg-table-cell">{rss.power}</td>
                                    <td className="small">{rss.qty}</td>
                                </tr>
                            )
                        })}

                        <tr>
                            <td className="small"></td>
                            <td className="small">{formatTotal(typeTotals.food)}</td>
                            <td className="small">{formatTotal(typeTotals.wood)}</td>
                            <td className="small">{formatTotal(typeTotals.stone)}</td>
                            <td className="small">{formatTotal(typeTotals.iron)}</td>
                            {/* <td className="col-1">{formatTotal(rss.gold)}</td>
                            <td className="col-1">{formatTime(rss.time)}</td>
                            <td className="col-1">{rss.power}</td>
                            <td className="col-1">{rss.qty}</td> */}
                        </tr>

                    </tfoot>

                </table>

                <br/>

            </div>
        )
    }
}


if (document.getElementById('troopsroot')) {
    // console.log("trying to render")
    ReactDOM.render(
        <TroopResCalc />, document.getElementById('troopsroot')
        )
    };

//    <th className="col-1">{totals.wood > 999 ? totals.wood > 999999  ? totals.wood > 999999999 ? `${(totals.wood / 1000000000).toFixed(1)}b` : `${(totals.wood / 1000000).toFixed(1)}m` : `${(totals.wood / 1000).toFixed(1)}k` : totals.wood}</th>

function formatTotal(total) {
    let newTotal = total > 999 ? total > 99999 ? total > 999999 ? total > 999999999 ? `${(total / 1000000000).toFixed(1)}b` : `${(total / 1000000).toFixed(1)}m` : `${(total / 1000).toFixed(0)}k` : `${(total / 1000).toFixed(1)}k` : total;
    return newTotal;
}
