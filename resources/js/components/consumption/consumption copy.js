import React, {Component} from "react";
import ReactDOM from "react-dom";

import {setDom, AccountSelect, getAccounts, getData} from "../../helpers";
import {Buildings, AddBuilding} from "./buildings";
import {BoxedRes} from "./resources";
import {Troops} from "./troops";
import { Achieved } from "./achieved";
import { Targets } from "./targets";

var resTypes = ["food", "wood", "stone", "iron"];

class Consumption extends Component {

    constructor() {
        super()

        this.handleAddBuilding = this.handleAddBuilding.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnChangeAchieved = this.handleOnChangeAchieved.bind(this);
        this.init = this.init.bind(this);
        this.b = [];

        this.targets = [125000000, 500000000, 1250000000, 2500000000, 5000000000];
        this.dataTypes = ['buildData', 'resData', 'troopData']

        this.state = {};
        this.state.conData = {
            buildData: [],
            troopData: [],
            resData: [],
            resCityData: [],
            totals: {
                    buildData: {"food":0, "wood":0, "stone":0, "iron":0,},
                    resData: {"food":0, "wood":0, "stone":0, "iron":0,},
                    troopData: {"food":0, "wood":0, "stone":0, "iron":0,},
                    },
        };
        this.state.achieved = {"food":0, "wood":0, "stone":0, "iron":0};
        this.state.acData = [];
        this.state.currentAc = 0;

    }

    componentDidMount() {
        getAccounts().then(acData => {
            if(acData.length) {
                this.setState({acData: acData});
                this.setState({currentAc : acData[0].id})
                let accountId = acData[0].id;
                // console.log("the ac = ", accountId)
                fetch(`/consumption/get/${accountId}`)
                    .then(response => response.json())
                    .then(response => {
                        let data = JSON.parse(response[0].data);
                        console.log("got consumption data??? ", data);
                        this.setState(data, () => {
                            this.getResData(accountId);
                            this.getTroopData(accountId);
                            // this.getResCityData(acData);
                        });
                    });
            } else {
                console.log("found none");
                // this.setState({resData: this.initRes(resData)});
            }
        });
    }

    getResCityData() {
        let res = {}
    }

    getResData() {
        fetch(`/resources/getAll`)
            .then(response => response.json())
            .then(response => {
                let resData = response;
                if(resData.length > 0) {
                    let newState = Object.assign({}, this.state);
                    resData.forEach(ac => {
                        let newRes = {};
                        newRes.name = ac.name;
                        let data = JSON.parse(ac.data);
                        data.forEach(d => {
                            newRes[d.type] = d.total;
                            newRes.checked = true;
                        });
                        newState.conData.resData.push(newRes);
                    })
                    this.setState(newState);
                }
            });
    }

    getTroopData() {
        fetch(`/troops/get/${this.state.currentAc}`)
            .then(response => response.json())
            .then(response => {
                let troopData = JSON.parse(response[0].data);
                troopData = troopData.allTotals;
                console.log("trop resp = ", troopData);
                // return;
                if(troopData.length > 0) {
                    let newState = Object.assign({}, this.state);
                    troopData.forEach(ac => {
                        let newTroop = {};
                        newTroop.name = ac.type;
                        newTroop.food = ac.food;
                        newTroop.wood = ac.wood;
                        newTroop.stone = ac.stone;
                        newTroop.iron = ac.iron;
                        newTroop.checked = true;
                        newState.conData.troopData.push(newTroop);
                    })
                    this.setState(newState);
                }
            });
    }

    init(b) {
        // console.log("b = ", this.b);
        // this.setState({buildData: b});
        return(this.b);
    }

    handleAddBuilding(e, f) {
        e.preventDefault();
        // console.log("click add ", e.target.type.value);

        let newState = Object.assign({}, this.state);
        let newBuild = {};
        newBuild.name = e.target.type.value;
        newBuild.level = e.target.level.value;
        newBuild.food = e.target.food.value;
        newBuild.wood = e.target.wood.value;
        newBuild.stone = e.target.stone.value;
        newBuild.iron = e.target.iron.value;
        newBuild.checked = true;
        newState.conData.buildData.push(newBuild);
        this.setState(newState, this.calc_totals());

    }

    handleOnChange(e) {
        let index = e.target.form.attributes.index.value;
        let whichDataType = e.target.form.attributes.data.value;
        console.log(e.target.form.attributes.data.value);

        let newState = Object.assign({}, this.state);
        let newData = newState.conData[whichDataType][index];
        let which = e.target.attributes.data.value;
        if(e.target.type == "checkbox") {
            newData[which] = !newData[which];
        } else {
            newData[which] = e.target.value;
        }
        this.setState(newState, this.calc_totals());
    }

    calc_totals() {
        let newState = Object.assign({}, this.state);
        let totals = newState.conData.totals;

        this.dataTypes.forEach(dataType => {        // E.g buildData, troopData, resData
            let datas = newState.conData[dataType];
            resTypes.forEach(resType => {           // Food, wood, stone, iron
                totals[dataType][resType] = 0;
                datas.forEach(item => {
                    if(item.checked) {             // Only add to the toal if its checked
                        totals[dataType][resType] += Number(item[resType]);
                    }
                });
            });
        });

        // console.log(totals);
        this.setState(newState, this.saveValues);
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
                fetch(`/consumption/store/${this.state.currentAc}`, {
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

    handleOnChangeAchieved(e) {
        // console.log(e.target.value);
        let name = e.target.name;
        let newState = Object.assign({}, this.state);
        newState.achieved[name] = e.target.value;
        this.setState(newState);
    }

    render() {
        return (
            <div>
                <AccountSelect
                    currentAc = {this.state.currentAc}
                    acList = {this.state.acData}
                    // onChange = {(e) => (this.handleAcChange(e))}
                />
                <Buildings
                    buildData = {this.state.conData.buildData}
                    totals = {this.state.conData.totals.buildData}
                    onChange = {this.handleOnChange}
                    onTick = {this.handleOnTick}
                />
                <AddBuilding onClickAdd = {this.handleAddBuilding} />
                <hr/>
                <BoxedRes
                    boxedResData = {this.state.conData.resData}
                    totals = {this.state.conData.totals.resData}
                    onChange = {this.handleOnChange}
                />
                <Troops
                    troopData = {this.state.conData.troopData}
                    totals = {this.state.conData.totals.troopData}
                    onChange = {this.handleOnChange}
                />
                <Achieved 
                    achieved = {this.state.achieved}
                    onChange = {this.handleOnChangeAchieved}
                />
                <hr></hr>
                <Targets
                    targets = {this.targets}
                    achieved = {this.state.achieved}
                    totals = {this.state.conData.totals}
                    
                />
            </div>
        )
    }
}

setDom(Consumption, 'consumptionroot');