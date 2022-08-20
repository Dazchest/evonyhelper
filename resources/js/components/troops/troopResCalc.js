import React from "react"
import ReactDOM from "react-dom";

import {TroopQuantity} from './troopQuantity';
import TroopJson from "./troops.json";
import {formatTime, getAccounts, getData, AccountSelect, LoadingSpinner, UpdatingSpinner, LSpinner} from '../../helpers';
import axios from "axios";

class TroopResCalc extends React.Component {

    constructor() {
        super();
        console.log("original troopjson = ", TroopJson);
        // this.spreadsheetTroops = [];
        
        this.clear_totals = this.clear_totals.bind(this);
        this.calc_totals = this.calc_totals.bind(this);
        this.compileNewTroopData = this.compileNewTroopData.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.handleTroopQtyChange = this.handleTroopQtyChange.bind(this);
        this.handleTroopTypeChange = this.handleTroopTypeChange.bind(this);

        this.troopTypes = ["Ground", "Archers", "Cavarly", "Siege"];
        this.troopJson = [...TroopJson];
        console.log("new json = ", this.troopJson);
        this.state = {
            troopQty: [],           // Needs to save
            troopInfo: this.troopJson,
            currentTroopType: 0,
            totals: {},
            allTotals: [],          // Needs to save
            trainingSpeed: 0,
            dutyOfficerSpeed: 0,
            ac: [],
            currentAc: 0,
            isLoading: true,
            updating: false,
        };
    }

    componentDidMount() {
        // this.setState({isLoading: false});
        // return;
        getAccounts().then(acData => {
            console.log(acData);
            if(acData.length) {
                this.setState({ac: acData});
                this.setState({currentAc : acData[0].id})
                let accountId = acData[0].id;
                axios.get(`troops/get/${accountId}`)
                    .then(response => {
                        if(response.data) {
                            // console.log(response.data);
                            this.setState({troopQty: response.data.troopQty});
                            this.setState({allTotals: response.data.allTotals});
                            this.setState({trainingSpeed: response.data.trainingSpeed});
                            this.setState({dutyOfficerSpeed: response.data.dutyOfficerSpeed}, this.calc_new_training_time);
                            this.setState({isLoading: false});
                        } else {
                            console.log("found no troops for this account, so init blank troops")
                            this.compileNewTroopData();
                            this.setState({isLoading: false});
                        }
                    })
                    .catch(err => {
                        // console.log(err.message);
                        // console.log(err.response.message);
                    })
            } else {
                console.log("found no accounts, so init blank troops");
                this.compileNewTroopData();
                this.setState({isLoading: false});
            }
        });
    }

    getAccountTroopData(accountId) {
        axios.get(`troops/get/${accountId}`)
        .then(response => {
            if(response.data) {
                // console.log(response.data);
                this.setState({troopQty: response.data.troopQty});
                this.setState({allTotals: response.data.allTotals});
                this.setState({trainingSpeed: response.data.trainingSpeed});
                this.setState({dutyOfficerSpeed: response.data.dutyOfficerSpeed}, this.calc_new_training_time);
                this.setState({isLoading: false});
                this.setState({updating: false})
            } else {
                console.log("found no troops for this account, so init blank troops")
                this.compileNewTroopData();
                this.setState({isLoading: false});
                this.setState({updating: false})
            }
        })
        .catch(err => {
            // console.log(err.message);
            // console.log(err.response.message);
        })  
    }

    compileNewTroopData() {

        let troopTierTemp = [];
        let troopQtyTemp;

        this.state.troopInfo.forEach(type => {
            troopQtyTemp = [];
            type.forEach(tier => {
                troopQtyTemp.push(0);
            });
            troopTierTemp.push(troopQtyTemp);
        });
        
        this.setState({troopInfo: [...TroopJson]});
        this.setState({troopQty: troopTierTemp});
        this.setState({totals: {}});
        this.setState({allTotals: []});
        this.setState({trainingSpeed: 0});
        this.setState({dutyOfficerSpeed: 0});   //, this.calc_new_training_time
        this.calc_new_training_time();
}

    handleSpeedChange(e) {
        let newState = Object.assign({}, this.state);
        let i = e.target.id;
        newState[i] = e.target.value;
        this.setState(newState, ()=> this.calc_new_training_time());
    }

    calc_new_training_time() {
        let newState = Object.assign({}, this.state);
        
        let s1 = newState.trainingSpeed;
        let s2 = newState.dutyOfficerSpeed;
        let speed = Number(s1) + Number(s2);

        // Need to go through and change all troop types, not just the current troop type
        // This will make sure that the AllTotals is correct
        newState.troopInfo.forEach(troopType => {
            troopType.forEach(troop => {
                let basetime = Number(troop.basetime);
                let time = basetime / (1+(speed/100));
                troop.time = time;      
            })
        })

        this.setState(newState, this.calc_totals);
    }

    clear_totals() {
        console.log("clearing totals");

        let totals = this.state.totals;
        totals.food = 0;

    }

    calc_totals() {
        // return;
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
        let troops = newState.troopInfo[this.state.currentTroopType];
        let troopQty = newState.troopQty[this.state.currentTroopType];
        let index = 0;

        troops.forEach(troop => {
            newStateTotals.food += troop.food * troopQty[index];
            newStateTotals.wood += troop.wood * troopQty[index];
            newStateTotals.stone += troop.stone * troopQty[index];
            newStateTotals.iron += troop.iron * troopQty[index];
            newStateTotals.gold += troop.gold * troopQty[index];

            // t += troop.time * troopQty[index];
            newStateTotals.time += troop.time * troopQty[index];

            newStateTotals.power += troop.power * troopQty[index];
            newStateTotals.qty += Number(troopQty[index]);
            index++;
        });
        // newStateTotals.time = t;

        this.setState(newState);
        // return;

        //-------------------------------------------
        // We need all the troop types info and quantities now
        //-------------------------------------------
        troopQty = newState.troopQty;
        let allTotalsState = [];
        let typeIndex = 0;
        newState.troopInfo.forEach(troopType => {
            // allTotalsState.push([]);
            let typeData = {food:0, wood:0, stone:0, iron:0, gold:0, time:0, power:0, qty:0};
            index = 0;
            troopType.forEach(troop => {
                typeData.type = troop.type;
                typeData.food += troop.food * troopQty[typeIndex][index];
                typeData.wood += troop.wood * troopQty[typeIndex][index];
                typeData.stone += troop.stone * troopQty[typeIndex][index];
                typeData.iron += troop.iron * troopQty[typeIndex][index];
                typeData.gold += troop.gold * troopQty[typeIndex][index];
                typeData.time += troop.time * troopQty[typeIndex][index];
                typeData.power += troop.power * troopQty[typeIndex][index];
                typeData.qty += Number(troopQty[typeIndex][index]);

                index++;
            });
            allTotalsState.push(typeData);
            typeIndex++;
        });
        this.setState({allTotals: allTotalsState}, this.saveValues());

    }

    saveValues() {
        // return;
        let saveDelay = 2000;
        if(this.bob) {
            clearTimeout(this.bob);
        }
        this.bob = setTimeout(() => {
            console.log("timer");
            if(this.state.currentAc) {
                // let data = this.state;
                let data = {};
                data.troopQty = this.state.troopQty;
                data.allTotals = this.state.allTotals;
                data.trainingSpeed = this.state.trainingSpeed;
                data.dutyOfficerSpeed = this.state.dutyOfficerSpeed;

                const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
                // return;
                console.log("saving to ac ", this.state.currentAc);
                fetch(`troops/store/${this.state.currentAc}`, {
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
        newState.troopQty[this.state.currentTroopType][i] = Number(e.target.value);
        this.setState(newState, () => {
            this.calc_totals();
        } );
    }

    handleTroopTypeChange(e) {
        let newState = Object.assign({}, this.state);
        newState.currentTroopType = e.target.value;
        this.setState(newState, 
            ()=>this.calc_new_training_time()
        );
    }

    handleAcChange(e) {
        this.setState({updating: true});
        this.setState({currentAc: e.target.value});
        let accountId = e.target.value;
        this.getAccountTroopData(accountId);
    }

    render() {
        // return (<p></p>);
        let totals = this.state.totals;
        let typeTotals = {food:0, wood:0, stone:0, iron:0, gold:0, time:0, power:0, qty:0};

        if(this.state.isLoading) {
            return <LoadingSpinner  />
        }
        // if(this.state.updating) {
        //     this.updatingDisplay = "visible"
        // } else {
        //     this.updatingDisplay = "hidden"
        // }

        return (
            <div className="card">

                <UpdatingSpinner updating={this.state.updating}></UpdatingSpinner>
            <span>hallaballoooo</span>
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

                <h2>{this.state.troopInfo[this.state.currentTroopType][0].type}</h2>

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
                            <th className="small" style={{width:'30%'}}>Qtyy</th>
                        </tr>
                    </thead>
                            <TroopQuantity 
                                troopInfo = {this.state.troopInfo}
                                troopQty = {this.state.troopQty}
                                currentTroopType = {this.state.currentTroopType}
                                onTroopQtyChange = {this.handleTroopQtyChange}
                            />
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
                            <Test></Test>
            </div>
        )
    }
}

const Test = () => {
    return(
        <span>hello from Test</span>
    )
}

if (document.getElementById('troopsroot')) {
    ReactDOM.render(
        <TroopResCalc />, document.getElementById('troopsroot')
        )
    };


function formatTotal(total) {
    let newTotal = total > 999 ? total > 99999 ? total > 999999 ? total > 999999999 ? `${(total / 1000000000).toFixed(1)}b` : `${(total / 1000000).toFixed(1)}m` : `${(total / 1000).toFixed(0)}k` : `${(total / 1000).toFixed(1)}k` : total;
    return newTotal;
}
