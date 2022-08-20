import React from "react";
import {formatTotal} from "../../helpers";

export function Troops(props) {

    let troopData = props.troopData;
    let totals = props.totals;

    return (
        <div className="card">
            <h3>Troops</h3>
            <table className="table">
                <thead>
                    <tr>
                        <td></td><td></td><td>Food</td><td>Wood</td><td>Stone</td><td>Iron</td><td>Include</td>
                    </tr>
                </thead>
                <tbody>
                    {troopData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}<form id={"troopForm" + index} data="troopData" index={index} ></form></td>
                                <td></td>
                                <td>{formatTotal(item.food)}</td>
                                <td>{formatTotal(item.wood)}</td>
                                <td>{formatTotal(item.stone)}</td>
                                <td>{formatTotal(item.iron)}</td>
                                <td><input type="checkbox" data="checked" checked={item.checked} onChange={props.onChange} form={"troopForm" + index}></input></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td><td></td><td>{formatTotal(totals.food)}</td><td>{formatTotal(totals.wood)}</td><td>{formatTotal(totals.stone)}</td><td>{formatTotal(totals.iron)}</td><td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}