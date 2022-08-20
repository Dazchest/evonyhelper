import React from "react";


export function RequiredList(props) {

    let requiredList = props.requiredList;
    let totals = props.totals;

    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Level</td>
                        <td>Food</td>
                        <td>Wood</td>
                        <td>Stone</td>
                        <td>Iron</td>
                        <td>Time</td>
                    </tr>
                </thead>
                <tbody>
                    {requiredList.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td>{item.name} </td>
                                <td>{item.level}</td>
                                <td>{item.food}</td>
                                <td>{item.wood}</td>
                                <td>{item.stone}</td>
                                <td>{item.iron}</td>
                                <td>{item.time}</td>
                            </tr>
                        )
                    })}

                    <tr>
                        <td></td><td></td>
                        <td>{totals.food}</td>
                        <td>{totals.wood}</td>
                        <td>{totals.stone}</td>
                        <td>{totals.iron}</td>
                        <td>{totals.time}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}