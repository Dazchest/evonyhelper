import React from "react";


export function Achieved(props) {

    let achieved = props.achieved;

    return (
        <div className="card">
            <h3>Achieved</h3>
            <table>
                <thead>
                <tr>
                    <td></td><td>Food</td><td>Wood</td><td>Stone</td><td>Iron</td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                    <td></td>
                    <td><input type="number" name="food" onChange={props.onChange} value={achieved.food}/></td>
                    <td><input type="number" name="wood" onChange={props.onChange} value={achieved.wood} /></td>
                    <td><input type="number" name="stone" onChange={props.onChange} value={achieved.stone} /></td>
                    <td><input type="number" name="iron" onChange={props.onChange} value={achieved.iron} /></td>
                    </tr>
                </tbody>
            </table>





        </div>
    )
}