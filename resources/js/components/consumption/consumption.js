import React, {Component} from "react";
import ReactDOM from "react-dom";

import {setDom, AccountSelect, getAccounts, getData, formatTotal, LoadingSpinner} from "../../helpers";
import {Buildings, AddBuilding} from "./buildings";
import {BoxedRes} from "./resources";
import {CityRes} from "./resources_city";
import {Troops} from "./troops";
import { Achieved } from "./achieved";
import { Targets } from "./targets";
import { BuildTroopResRequired } from "./buildtroopresrequired";
import { Minutes } from "./minutes";

var resTypes = ["food", "wood", "stone", "iron"];

class Consumption extends Component {

    constructor() {
        super()

        this.handleAddBuilding = this.handleAddBuilding.bind(this);
        this.handleRemoveBuilding = this.handleRemoveBuilding.bind(this);
        this.handleChangeBuilding = this.handleChangeBuilding.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnChangeAchieved = this.handleOnChangeAchieved.bind(this);
        this.handleOnEditChange = this.handleOnEditChange.bind(this);
        // this.handleOnFocus = this.handleOnFocus.bind(this);
        this.init = this.init.bind(this);
        this.b = [];

        this.targets = [125000000, 500000000, 1250000000, 2500000000, 5000000000];
        this.dataTypes = ['buildData', 'resData', 'troopData' ,'resCityData']

        // this.state = {};
        this.state = {
            isLoaded: false,
            minutes: 0,
            buildData: [],
            troopData: [],
            resData: [],
            resCityData: [],
            buildingList: [],
            findBuildingType: 1,
            totals: {
                    buildData: {"food":0, "wood":0, "stone":0, "iron":0,},
                    resData: {"food":0, "wood":0, "stone":0, "iron":0,},
                    resCityData: {"food":0, "wood":0, "stone":0, "iron":0,},
                    troopData: {"food":0, "wood":0, "stone":0, "iron":0,},
                    },
        };
        this.state.achieved = {"food":0, "wood":0, "stone":0, "iron":0};
        this.state.acData = [];
        this.state.currentAc = 0;

    }

    componentDidMount() {
        getAccounts().then(async (acData) => {
            // const bob = async () => {
        console.log("acdata", acData);
        console.log("123123");
            if(acData.length) {
                this.setState({acData: acData});
                this.setState({currentAc : acData[0].id})
                let accountId = acData[0].id;
                await fetch(`consumption/get/${accountId}`)
                    .then(response => response.json())
                    .then(response => {
                        if(response.length) {
                            let data = JSON.parse(response[0].data);
                            // console.log("got consumption data??? ", data);

                            let newState = Object.assign({}, this.state);
                            newState.resData = data.resData;
                            newState.troopData = data.troopData;
                            newState.buildData = data.buildData;
                            newState.resCityData = data.resCityData;
                            newState.achieved = data.achieved;
                            newState.minutes = data.minutes;
                            // this.setState(data, () => {
                            this.setState(newState, () => {
                                this.init(accountId);
                            });
                        } else {
                            console.log("going to init")
                            this.init(accountId);
                        }
                    });
            } else {
                console.log("found none");
                // this.setState({resData: this.initRes(resData)});
            }
            this.setState({isLoaded: true});
        // }
        });
    }

    init(accountId) {
        console.log("in init")
        this.getResData(accountId);
        this.getTroopData(accountId);
        this.getResCityData();
        this.calc_totals();
        this.getBuildingList();
    }

    getBuildingList() {
        fetch(`buildings/getbuildings`)
        .then(res => res.json())
        .then(res => {
            this.setState({buildingList: res});
        })
    }


    getResCityData() {
        let cityRes = [];
        let resData = {"food":0, "wood":0, "stone":0, "iron":0, "checked": true}
        let newState = Object.assign({}, this.state);

        this.state.acData.forEach((ac) => {
            // Check if ac is already saved/loaded into state
            if (newState.resCityData.some(e => e.id === ac.id)) {
                // console.log("yayayayayayayay  " , ac.name);
            } else {
                let r = {};
                r.name = ac.name;
                r.id = ac.id;
                r = Object.assign(r, resData);
                newState.resCityData.push(r);
            }
        });
        this.setState(newState);
    }

    getResData() {
        
        fetch(`resources/getAll`)
            .then(response => response.json())
            .then(response => {
                let resData = response;
                if(resData.length > 0) {
                    let newState = Object.assign({}, this.state);

                    // Need to save the checkbox that was saved/loaded before we clear it
                    let checks = [];
                    newState.resData.forEach(item => {
                        if(item.checked) {
                            checks.push(item.name);        // save the name if checked
                        }
                    });
                    // console.log("checked = ", checks);
                    //--------

                    newState.resData = [];          // Clear the old saved data
                    resData.forEach(ac => {
                        let newRes = {};
                        newRes.name = ac.name;
                        newRes.checked = checks.indexOf(newRes.name) != -1 ? true : false;
                        let data = JSON.parse(ac.data);
                        data.forEach(d => {
                            newRes[d.type] = d.total;
                        });
                        newState.resData.push(newRes);
                    })
                    this.setState(newState);
                }
            });
    }

    getTroopData() {
        fetch(`troops/get/${this.state.currentAc}`)
            .then(response => response.json())
            .then(response => {
                let troopData = response.allTotals;
                if(troopData.length > 0) {
                    let newState = Object.assign({}, this.state);

                    // Need to save the checkbox that was saved/loaded before we clear it
                    let checks = [];
                    newState.troopData.forEach(item => {
                        if(item.checked) {
                            checks.push(item.name);        // save the name if checked
                        }
                    });
                    // console.log("checked = ", checks.indexOf('Ground'));
                    //--------

                    newState.troopData = [];          // Clear the old saved data
                    troopData.forEach(ac => {
                        let newTroop = {};
                        newTroop.name = ac.type;
                        newTroop.food = ac.food;
                        newTroop.wood = ac.wood;
                        newTroop.stone = ac.stone;
                        newTroop.iron = ac.iron;
                        newTroop.checked = checks.indexOf(newTroop.name) != -1 ? true : false;
                        newState.troopData.push(newTroop);
                    })
                    this.setState(newState);
                }
            });
    }

    // init(b) {
    //     // console.log("b = ", this.b);
    //     // this.setState({buildData: b});
    //     return(this.b);
    // }

    handleChangeBuilding(e) {
        console.log(e.target.value);
        this.setState({findBuildingType: e.target.value})
    }

    handleAddBuilding(e, f) {
        e.preventDefault();
        // console.log("click add ", e.target.type);
        // return;
        let newState = Object.assign({}, this.state);
        let newBuild = {};
        // newBuild.name = e.target.type.value;
        // newBuild.name = e.target.buildingList.value;
        newBuild.name = e.target.buildingList.selectedOptions[0].text;
        newBuild.level = e.target.level.value;
        newBuild.food = e.target.food.value;
        newBuild.wood = e.target.wood.value;
        newBuild.stone = e.target.stone.value;
        newBuild.iron = e.target.iron.value;
        newBuild.checked = true;
        newState.buildData.push(newBuild);
        this.setState(newState, this.calc_totals());
        // this.setState(newState);
    }

    handleRemoveBuilding(e) {
        let newState = Object.assign({}, this.state);
        newState.buildData.splice(e.target.value, 1);
        this.setState(newState, this.calc_totals());
    }

    handleOnChange(e) {
        let index = e.target.form.attributes.index.value;
        let whichDataType = e.target.form.attributes.data.value;
        // console.log(e.target.form.attributes.data.value);

        let newState = Object.assign({}, this.state);
        let newData = newState[whichDataType][index];
        console.log(7);
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
        let totals = newState.totals;

        this.dataTypes.forEach(dataType => {        // E.g buildData, troopData, resData
            let datas = newState[dataType];
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
                fetch(`consumption/store/${this.state.currentAc}`, {
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
                        console.log("saved  .........");
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

    handleOnEditChange(e) {
        // console.log("third innertext = ", e.target.innerText)
        let row = e.target.attributes.row.value;
        let col = e.target.attributes.col.value;
        
        let newState = Object.assign({}, this.state);
        newState.resCityData[row][col] = e.target.attributes.formattedValue.value;
        // console.log("forsth innertext = ", e.target.innerText)
        this.setState(newState, this.calc_totals);
    }


    handleMinutesChange(e) {
        this.setState({minutes: e.target.value}, this.saveValues());
    }

    render() {
        if(!this.state.isLoaded) {
            return (
                <LoadingSpinner />
            )
        }
        let tempResCityData = [...this.state.resCityData];

        return (
            <div>
                <AccountSelect
                    currentAc = {this.state.currentAc}
                    acList = {this.state.acData}
                    // onChange = {(e) => (this.handleAcChange(e))}
                />
                <Buildings
                    buildData = {this.state.buildData}
                    totals = {this.state.totals.buildData}
                    onChange = {this.handleOnChange}
                    onClickRemove = {this.handleRemoveBuilding}
                    onTick = {this.handleOnTick}
                />
                <AddBuilding 
                    onClickAdd = {this.handleAddBuilding}
                    onBuildingChange = {this.handleChangeBuilding}
                    buildingList = {this.state.buildingList}
                    findBuildingType = {this.state.findBuildingType}
                />
                <hr/>
                <CityRes
                    resCityData = {tempResCityData}
                    // resCityData = {this.state.resCityData}
                    totals = {this.state.totals.resCityData}
                    acData = {this.state.acData}
                    onChange = {this.handleOnChange}
                    onEditChange = {this.handleOnEditChange}
                    // onFocus = {this.handleOnFocus}
                />
                <BoxedRes
                    boxedResData = {this.state.resData}
                    totals = {this.state.totals.resData}
                    onChange = {this.handleOnChange}
                    formatTotal = {formatTotal}
                />
                <hr/>
                <Troops
                    troopData = {this.state.troopData}
                    totals = {this.state.totals.troopData}
                    onChange = {this.handleOnChange}
                />
                <hr></hr>
                <BuildTroopResRequired
                    totals = {this.state.totals} 
                />
                <hr/>
                <Achieved 
                    achieved = {this.state.achieved}
                    onChange = {this.handleOnChangeAchieved}
                />
                <hr/>
                <Targets
                    targets = {this.targets}
                    achieved = {this.state.achieved}
                    totals = {this.state.totals}
                    
                />
                <hr></hr>
                <Minutes
                    minutesAchieved = {this.state.minutes}
                    onChange = {e=>this.handleMinutesChange(e)}
                />
            </div>
        )
    }
}

setDom(Consumption, 'consumptionroot');