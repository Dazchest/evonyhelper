import React from "react";
import { formatTotal } from "../../helpers";

export function Targets(props) {

    let targets = props.targets;
    let achieved = props.achieved;
    let totals = props.totals;
    // console.log(totals.troopData.food)

    let totalTroopBuild = {
        "food":0 + totals.troopData.food + totals.buildData.food,
        "wood":0 + totals.troopData.wood + totals.buildData.wood,
        "stone":0 + totals.troopData.stone + totals.buildData.stone,
        "iron":0 + totals.troopData.iron + totals.buildData.iron,
    };
    let totalRes = {
        "food":0 + totals.resData.food + totals.resCityData.food,
        "wood":0 + totals.resData.wood + totals.resCityData.wood,
        "stone":0 + totals.resData.stone + totals.resCityData.stone,
        "iron":0 + totals.resData.iron + totals.resCityData.iron,
    };
    // Object.entries(totalTroopBuild).map(item => {
    //     totalTroopBuild[item[0]]
    //     console.log(item[0]);
    // })

    let spacer1 = {
        height:'20',
    };
    let spacer2 = {
        backgroundColor:'red',
        height:'20',
    };

    return (
        <div className="card">
            <h3>Targets</h3>
            <table>
                <thead>
                <tr>
                    <td></td><td></td><td>Food</td><td>Wood</td><td>Stone</td><td>Iron</td>
                </tr>
                </thead>
                    {targets.map((item, index) => {
                        return(
                            <React.Fragment key={index}>
                            <tbody className="bg-warning">
                            <tr className="bg-warning">
                                <td className="font-weight-bold">{item.toLocaleString()}</td>
                                <td>still to go -></td>
                                <td>{(item - achieved.food)>0 ? formatTotal(item - achieved.food) : "achieved"}</td>
                                <td>{(item - achieved.wood)>0 ? formatTotal(item - achieved.wood) : "achieved"}</td>
                                <td>{(item - achieved.stone)>0 ? formatTotal(item - achieved.stone) : "achieved"}</td>
                                <td>{(item - achieved.iron)>0 ? formatTotal(item - achieved.iron) : "achieved"}</td>
                            </tr>

                            <tr>
                        <td>Required after</td>
                        <td>builds and troops</td>
                        <td>{(item - achieved.food - totalTroopBuild.food)>0 ? formatTotal(item - achieved.food - totalTroopBuild.food) : "achieved"}</td>
                        <td>{(item - achieved.wood - totalTroopBuild.wood)>0 ? formatTotal(item - achieved.wood - totalTroopBuild.wood) : "achieved"}</td>
                        <td>{(item - achieved.stone - totalTroopBuild.stone)>0 ? formatTotal(item - achieved.stone - totalTroopBuild.stone) : "achieved"}</td>
                        <td>{(item - achieved.iron - totalTroopBuild.iron)>0 ? formatTotal(item - achieved.iron - totalTroopBuild.iron) : "achieved"}</td>
                            </tr>

                        <tr style={spacer1}><td  colSpan="6"></td></tr>

                        <tr>
                        <td>Total res</td>
                        <td></td>
                        <td>{formatTotal(totalRes.food)}</td>
                        <td>{formatTotal(totalRes.wood)}</td>
                        <td>{formatTotal(totalRes.stone)}</td>
                        <td>{formatTotal(totalRes.iron)}</td>
                        </tr>
                    </tbody>

                    <tbody className="bg-warning">
                        <tr>
                        <td>Shortfall</td>
                        <td></td>
                        <td>{(item - achieved.food - totalRes.food)>0 ? formatTotal(item - achieved.food - totalRes.food) : 0}</td>
                        <td>{(item - achieved.wood - totalRes.wood)>0 ? formatTotal(item - achieved.wood - totalRes.wood) : 0}</td>
                        <td>{(item - achieved.stone - totalRes.stone)>0 ? formatTotal(item - achieved.stone - totalRes.stone) : 0}</td>
                        <td>{(item - achieved.iron - totalRes.iron)>0 ? formatTotal(item - achieved.iron - totalRes.iron) : 0}</td>
                        </tr>
                        <tr style={spacer2}><td colSpan="6"></td></tr>
                    </tbody>

                            </React.Fragment>
                        )
                    })}
            </table>
        </div>
    )
}