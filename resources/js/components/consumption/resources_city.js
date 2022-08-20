import React from "react";
import {formatTotal, EditCell} from "../../helpers";


export function CityRes(props) {

    let acData = props.acData;  
    let res = props.resCityData;
    let totals = props.totals;

    function getAccountName(ac_id) {
        let o = acData.find(e => e.id === ac_id);
        if(o) {
            return o.name;
        }
        return "none";

    }
    
    return(
        <div>
            <h3>Resources in city</h3>

            <table className="table">
                <thead>
                    <tr>
                        <td></td><td></td><td>Food</td><td>Wood</td><td>Stone</td><td>Iron</td><td>Include</td>
                    </tr>
                </thead>
                <tbody>
                    {res.map((ac, index) => {
                        return (
                            <React.Fragment key={index}>
                            
                                <tr>    
                                    <td>{getAccountName(ac.id)}<form id={"resCityForm" + index} data="resCityData" index={index}></form></td>
                                    <td></td>
                                    <EditCell 
                                        row = {index}
                                        col = "food"
                                        value = {formatTotal(ac.food)}
                                        originalValue = {ac.food}
                                        onEditChange = {props.onEditChange}
                                    />
                                    <EditCell 
                                        row = {index}
                                        col = "wood"
                                        value = {formatTotal(ac.wood)}
                                        originalValue = {ac.wood}
                                        onEditChange = {props.onEditChange}
                                    />
                                    <EditCell 
                                        row = {index}
                                        col = "stone"
                                        value = {formatTotal(ac.stone)}
                                        originalValue = {ac.stone}
                                        onEditChange = {props.onEditChange}
                                    />
                                    <EditCell 
                                        row = {index}
                                        col = "iron"
                                        value = {formatTotal(ac.iron)}
                                        originalValue = {ac.iron}
                                        onEditChange = {props.onEditChange}
                                    />
                                
                                    <td><input type="checkbox" data="checked" checked={ac.checked} onChange={props.onChange} form={"resCityForm" + index}></input></td>
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

