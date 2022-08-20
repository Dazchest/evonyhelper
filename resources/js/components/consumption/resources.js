import React from "react";
// import {formatTotal} from "../../helpers";


export function BoxedRes(props) {

    let res = props.boxedResData;
    let totals = props.totals;
    let formatTotal = props.formatTotal;

    return(
        <div>
            <h3>Resources in boxes</h3>

            <table className="table">
                <thead>
                    <tr>
                        <td></td><td></td><td>Food</td><td>Wood</td><td>Stone</td><td>Iron</td><td>Include</td>
                    </tr>
                </thead>
                <tbody>
                    {res.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                            
                                <tr>
                                    <td>{item.name}<form id={"resForm" + index} data="resData" index={index}></form></td>
                                    <td></td>
                                    <td>{formatTotal(item.food)}</td>
                                    <td>{formatTotal(item.wood)}</td>
                                    <td>{formatTotal(item.stone)}</td>
                                    <td>{formatTotal(item.iron)}</td>
                                    <td><input type="checkbox" data="checked" checked={item.checked} onChange={props.onChange} form={"resForm" + index}></input></td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                <tr>
                    <td></td><td></td><td>{formatTotal(totals.food)}</td><td>{formatTotal(totals.wood)}</td><td>{formatTotal(totals.stone)}</td><td>{formatTotal(totals.iron)}</td><td></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
} 