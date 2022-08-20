import React, { Component } from "react";

import {AccountBuildings, BuildingList} from "./account_buildings";
import {setDom, getAccounts, AccountSelect} from "../../helpers";
import { RequiredList } from "./requiredList";
import { UpdateValues } from "./updateValues";
import { UpdateRequired } from "./updateRequired";
import { Ang } from "./vsang";

export class Buildings extends Component {

    constructor() {
        super();

        this.getBuil

        this.state = {
            acBuildings: [],
            currentCard: 0,
            currentAc: 0,
            acData: [],
            buildingList: [],
            requiredList: [],
            buildingValues: [],
            totals: {"food":0, "wood":0, "stone":0, "iron":0, "time":0},
            findBuildingType: 1,
            findBuildingLevel: 1,
            isLoading: true,
        }
        
    }

    componentDidMount() {
        console.log("here")
        getAccounts()
            .then(res => {
                this.setState({currentAc: res[0].id})
                this.setState({acData: res})
                // console.log(res);

                this.getBuildingsAccount(res[0].id);
            });
        this.getBuildingList().then(res => {
            }
        );
    }

    async getBuildingList() {
        await fetch(`buildings/getbuildings`)
        .then(res => res.json())
        .then(res => {
            this.setState({buildingList: res});
            this.setState({isLoading: false});
        })
    }

    getBuildingsAccount(ac) {
        fetch(`buildingsaccount/get/${ac}`)
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            this.setState({acBuildings: res});
        })
    }

    handleChangeAccount(e) {
        console.log("changing to ac = ", e.target.value);
        this.setState({currentAc: Number(e.target.value)} , this.getBuildingsAccount(e.target.value));
        // this.setState({currentAc: e.target.value} , this.getBuildings(e.target.value))
    }

    changeCard(e, card) {
        this.setState({currentCard: card});
    }

    handleOnChangeLevel(e) {
        // console.log(e.target.attributes.index.value);
        let newState = Object.assign({}, this.state);
        newState.acBuildings[e.target.attributes.index.value].level = Number(e.target.value);
        newState.acBuildings[e.target.attributes.index.value].type = Number(e.target.attributes.data.value);

        //Check for keep, and update Walls automatically
        if(Number(e.target.attributes.data.value) == 1) {
            if(newState.acBuildings[25].level < e.target.value-1) {
                newState.acBuildings[25].level = Number(e.target.value-1);
            }
        }
        // console.log("type", e.target.attributes.data.value);
        this.setState(newState, this.saveValues);
        // this.setState(newState);
    }

    calc_totals() {
        let newState = Object.assign({}, this.state);
        newState.totals.food = 0;   // Reset to zero
        newState.totals.wood = 0;   // Reset to zero
        newState.totals.stone = 0;   // Reset to zero
        newState.totals.iron = 0;   // Reset to zero
        newState.totals.time = 0;   // Reset to zero
        this.state.requiredList.forEach((item, index) => {
            newState.totals.food += Number(item.food);
            newState.totals.wood += Number(item.wood);
            newState.totals.stone += Number(item.stone);
            newState.totals.iron += Number(item.iron);
            newState.totals.time += Number(item.time);
        })

        this.setState(newState);
    }

    saveValues() {
        let saveDelay = 2000;
        if(this.bob) {
            clearTimeout(this.bob);
        }
        this.bob = setTimeout(() => {
            console.log("timer");
            if(this.state.currentAc) {
                let data = this.state.acBuildings;
                const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
                // return;
                console.log("saving to ac ", this.state.currentAc);
                fetch(`buildingsaccount/store/${this.state.currentAc}`, {
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


    getRequired(e) {
        e.preventDefault();
        let ac_id = this.state.currentAc;
        let type = this.state.findBuildingType;
        let level = this.state.findBuildingLevel;

        fetch(`buildings/show/${ac_id}/${type}/${level}`)
            .then(res => res.json())
            .then(res => {
                console.log("getting", res);
                this.setState({requiredList: res}, () => {
                    this.calc_totals();
                })
            })
    }

    // handleChangeAccount(e) {
    //     console.log("changin ac to " + e.target.value);
    //     this.setState({currentAc: e.target.value})
    //     let accountId = e.target.value
    //     getData("/resources/get", accountId, resData, this.initRes).then(response => {
    //         console.log("got data on change???", response);
    //         this.setState({resData: response});
    //     });
    // }
    
    handleBuildingChange(e) {
        this.setState({findBuildingType: e.target.value});
    }
    handleLevelChange(e) {
        this.setState({findBuildingLevel: Number(e.target.value)})
    }
    getBuildingLevelsCount() {
        axios.get(`buildings/editvalues/1`)
            .then(res => {
                let buildingValues = [];
                // this.setState({buildingValues: res.data})
                buildingValues = res.data;
                console.log("building list = ", buildingValues);
                return buildingValues.length;
            });

    }

    render() {
        // console.log("levels ", this.getBuildingLevelsCount());
        let levels = [];
        for(let x=1; x<41; x++) {
            levels.push(<option value={x} key={x}>{x}</option>);
            if(this.state.findBuildingType == 21) break;    // If arsenal
        }

        if(this.state.isLoading) {
            return <div>Loading...</div>
        }

        if(this.state.currentCard == 2) {
            return(
                <div>account buildings
                    <AccountBuildings
                        buildings={this.state.acBuildings} 
                        onBack={e=>this.changeCard(e,1)}
                        onChange={e=>this.handleOnChangeLevel(e)}
                    />
                </div>
            )
        }
        if(this.state.currentCard == 3) {
            return(
                <UpdateValues 
                    buildingList = {this.state.buildingList}
                    onBack={e=>this.changeCard(e,1)}
                />
            )
        }
        if(this.state.currentCard == 4) {
            return(
                <UpdateRequired
                    buildingList = {this.state.buildingList}
                    onBack = {e=>this.changeCard(e,1)}
                    levels = {levels}
                />
            )
        }
        if(this.state.currentCard == 5) {
            return(
                <Ang />
            )
        }

        return(
            <div>some buildings
                <AccountSelect 
                    onChange={(e)=>this.handleChangeAccount(e)} 
                    acList={this.state.acData} 
                    currentAC={this.state.currentAc}
                />
                <button onClick={e=>this.changeCard(e,2)}>Your Buildings</button>
                <button onClick={e=>this.changeCard(e,3)}>Update Buildings</button>
                <button onClick={e=>this.changeCard(e,4)}>Update Required</button>
                <br></br>

                <form>
                    <BuildingList 
                        buildingList = {this.state.buildingList}
                        onChange = {e=>this.handleBuildingChange(e)}
                        findBuildingType = {this.state.findBuildingType}
                    />
                    <select onChange = {e=>this.handleLevelChange(e)} name="level" value={this.state.findBuildingLevel}>
                        {levels}
                    </select>
                    <button onClick={e=>this.getRequired(e)}>Go</button>
                </form>

                <div>
                    <RequiredList
                        requiredList = {this.state.requiredList}
                        totals = {this.state.totals}
                    />
                </div>
            </div>
        )
    }
}

setDom(Buildings, 'buildingsroot');