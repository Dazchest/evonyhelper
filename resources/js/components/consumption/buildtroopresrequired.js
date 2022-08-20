import React, { Component } from 'react';
import {formatTotal} from "../../helpers";

export class BuildTroopResRequired extends Component {

    constructor(props) {
        super(props)
    }



    render() {
        // console.log("these props ", this.props.totals)
        let totals = this.props.totals;
        return(
            <div className="card">
                <h3>Goal</h3>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <td>Type</td>
                            <td>Food</td>
                            <td>Wood</td>
                            <td>Stone</td>
                            <td>Iron</td>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td>Buildings</td>
                            <td>{formatTotal(totals.buildData.food)}</td>
                            <td>{formatTotal(totals.buildData.wood)}</td>
                            <td>{formatTotal(totals.buildData.stone)}</td>
                            <td>{formatTotal(totals.buildData.iron)}</td>
                        </tr>
                        <tr>
                            <td>Troops</td>
                            <td>{formatTotal(totals.troopData.food)}</td>
                            <td>{formatTotal(totals.troopData.wood)}</td>
                            <td>{formatTotal(totals.troopData.stone)}</td>
                            <td>{formatTotal(totals.troopData.iron)}</td>
                        </tr>
                        <tr>
                            <td>City Res</td>
                            <td>{formatTotal(totals.resCityData.food)}</td>
                            <td>{formatTotal(totals.resCityData.wood)}</td>
                            <td>{formatTotal(totals.resCityData.stone)}</td>
                            <td>{formatTotal(totals.resCityData.iron)}</td>
                        </tr>
                        <tr>
                            <td>Boxed Res</td>
                            <td>{formatTotal(totals.resData.food)}</td>
                            <td>{formatTotal(totals.resData.wood)}</td>
                            <td>{formatTotal(totals.resData.stone)}</td>
                            <td>{formatTotal(totals.resData.iron)}</td>
                        </tr>
                        <tr>
                            <td>Required</td>
                            <td>{ 
                            totals.buildData.food + totals.troopData.food - totals.resCityData.food - totals.resData.food > 0 ?
                            formatTotal(totals.buildData.food + totals.troopData.food - totals.resCityData.food - totals.resData.food) :
                            0
                             }</td>
                            <td>{ 
                            totals.buildData.wood + totals.troopData.wood - totals.resCityData.wood - totals.resData.wood > 0 ?
                            formatTotal(totals.buildData.wood + totals.troopData.wood - totals.resCityData.wood - totals.resData.wood) :
                            0
                             }</td>
                            <td>{ 
                            totals.buildData.stone + totals.troopData.stone - totals.resCityData.stone - totals.resData.stone > 0 ?
                            formatTotal(totals.buildData.stone + totals.troopData.stone - totals.resCityData.stone - totals.resData.stone) :
                            0
                             }</td>
                            <td>{ 
                            totals.buildData.iron + totals.troopData.iron - totals.resCityData.iron - totals.resData.iron > 0 ?
                            formatTotal(totals.buildData.iron + totals.troopData.iron - totals.resCityData.iron - totals.resData.iron) :
                            0
                             }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}