import React, { Component } from "react"
import ReactDOM from "react-dom";

import {ResQty} from "./resQty";
import {loadFromStorage, getAccounts, AccountSelect, getData, saveValuesHelper} from "../../helpers";

var resTypes = ["food", "wood", "stone", "iron"];
var resSizes = [1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000];
var resData = [];

class Resources extends Component {

    constructor() {
        super()

        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.clear_values = this.clear_values.bind(this);
        this.clear_values = this.clear_values.bind(this);
        
        this.state = {
            ac: [],
            resData: resData,
            currentAc: 0,
        }
    }

    componentDidMount() {
        getAccounts().then(acData => {
            // console.log("account got??? " + acData);
            if(acData.length) {
                // console.table("found some " , acData)
                this.setState({ac: acData});
                this.setState({currentAc : acData[0].id})
                let accountId = acData[0].id;
                console.log("the ac = ", accountId)
                getData("resources/get", accountId, resData, this.initRes).then(response => {
                    console.log("got data???", response);
                    this.setState({resData: response});
                });
            } else {
                console.log("found none");
                this.setState({resData: this.initRes(resData)});
            }
        });
    }

    initRes() {
        console.log("initing res");
        let acResData = [];
        resTypes.forEach((type) => {
            let r = {};
            r.total = 0;
            r.type = type;
            r.updated = Date.now();
            
            resSizes.forEach((size) => {
                r[size] = 0;
            })
            acResData.push(r);
        })
        return acResData
    }

    handleQtyChange(e, t, s) {
        let newState = Object.assign({}, this.state);
        
        let i = resTypes.indexOf(t);
        newState.resData[i][s] = Number(e.target.value);

        this.setState(newState, this.calc_totals);
    }

    clear_values(e, type) {
        console.log("clear",e, type);
        let i = resTypes.indexOf(type);

        let newState = Object.assign({}, this.state);
        console.log("newstate resdata = ", newState.resData[i])
        // newState.resData[i].forEach((r, index) => {
            resSizes.forEach((size) => {
            newState.resData[i][size] = 0;
                    // r[size] = 0;
            })
            newState.resData[i].total = 0;
            newState.resData[i].updated = Date.now();     
        // })
        this.setState(newState, this.calc_totals());
    }

    calc_totals() {

        let newState = Object.assign({}, this.state);
        newState.resData.forEach((r, index) => {
            let total = 0;
            resSizes.forEach((size) => {
                total += size * r[size];      // Size * qty
            })
            // console.log("r = ", r);
            newState.resData[index].total = total;            
            newState.resData[index].updated = Date.now();     
        })

        // this.setState(newState, this.saveValues());
        this.setState(newState, async () => {
            await saveValuesHelper.save({
                url: `resources/store/${this.state.currentAc}`,
                data: this.state.resData,
                saveDelay: 2000,
                loggedIn: this.state.currentAc ? true : false,
            }).then(res => {console.log("res", res)});
        });
    }

    handleAcChange(e) {
        console.log("changin ac to " + e.target.value);
        this.setState({currentAc: e.target.value})
        let accountId = e.target.value
        getData("resources/get", accountId, resData, this.initRes).then(response => {
            console.log("got data on change???", response);
            this.setState({resData: response});
        });
    }

    render() {
        return (
            <div className="card">
                <span>wdwdwd</span>
                <AccountSelect
                    currentAc = {this.state.currentAc}
                    acList = {this.state.ac}
                    onChange = {(e) => (this.handleAcChange(e))}
                />

                {this.state.resData.map((data, index) => {    //this.state.currentAc
                    return ( 
                        <ResQty
                            key = {index}
                            data = {data}
                            resSizes = {resSizes}
                            handleQtyChange = {this.handleQtyChange}
                            handleReset = {this.clear_values}
                        />
                    )
                })
                }
            </div>
        )
    }
}



if (document.getElementById('resourceroot')) {
    ReactDOM.render(
        <Resources />, document.getElementById('resourceroot')
        )
    };