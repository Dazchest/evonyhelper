import React, { Component } from "react"
import ReactDOM from "react-dom";

import {ResQty} from "./resQty";

var resTypes = ["food", "wood", "stone", "iron"];
var resSizes = [1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000];
var resData = [];

class Resources extends Component {

    constructor() {
        super()

        this.initRes();
        this.handleQtyChange = this.handleQtyChange.bind(this);

        if(localStorage.hasOwnProperty("resData")) {
            let savedState = localStorage.getItem("resData");
            savedState = JSON.parse(savedState);
            console.log(savedState);
            this.state = {"resData": savedState};
        } else {
            this.state = {"resData": resData};
        }
        this.state.timer = 22;

        // this.md = new Remarkable();
    }

    updateTimer() {
        this.setState({timer: Date.now()});
    }

    componentDidMount() {
        this.timer = setInterval(() => this.updateTimer(), 1000)
    }

    initRes() {
        resTypes.forEach((type) => {
            let r = {};
            r.total = 0;
            r.type = type;
            
            resSizes.forEach((size) => {
                r[size] = 0;
            })
            resData.push(r);
        })

        console.log(resData);
    }

    handleQtyChange(e, t, s) {
        let newState = Object.assign({}, this.state);
        
        let i = resTypes.indexOf(t);
        newState.resData[i][s] = Number(e.target.value);

        this.setState(newState, this.calc_totals);
    }

    calc_totals() {
        // let newState = Object.assign({}, this.state);

        // newState.resData.forEach((r, index) => {
        //     let total = 0;
        //     resSizes.forEach((size) => {
        //         total += size * r[size];      // Size * qty
        //     })
        //     newState.resData[index].total = total;
        // })

        // this.setState(newState, () => {
        //     localStorage.setItem("resData", JSON.stringify(this.state.resData));
        // });

        this.state.resData.forEach((r, index) => {
            let total = 0;
            resSizes.forEach((size) => {
                total += size * r[size];      // Size * qty
            })
            this.setState(state => {
                state.resData[index].total = total;            
            }, 
            () => {
                localStorage.setItem("resData", JSON.stringify(this.state.resData));
            }
            
            )
        })

        //         this.setState(newState, () => {
        //     localStorage.setItem("resData", JSON.stringify(this.state.resData));
        // });

    }

    render() {
        return (
            <div className="card">
                {this.state.timer}
                {this.state.resData.map((data, index) => {
                    return (
                        <ResQty
                            key = {index}
                            data = {data}
                            resSizes = {resSizes}
                            handleQtyChange = {this.handleQtyChange}
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