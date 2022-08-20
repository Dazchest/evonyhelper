import React from "react";
import {formatTotal} from "../../helpers";
import {BuildingList} from "../buildings/account_buildings"

export function Buildings(props) {

    let buildData = props.buildData;
    let totals = props.totals;

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>Building</td><td>Level</td><td>Food</td><td>Wood</td>
                        <td>Stone</td><td>Iron</td><td>Include</td>
                    </tr>
                </thead>
                <tbody>
                {buildData.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                        
                        <tr>
                            <td><form id={"buildingsForm" + index} data="buildData" index={index}></form><input className="form-control px-0" type="text" data="name" value={item.name} form={"buildingsForm" + index} onChange={props.onChange}></input></td>
                            <td><input className="form-control px-0" type="number" data="level" value={item.level} form={"buildingsForm" + index} onChange={props.onChange}></input></td>
                            <td><input className="form-control px-0" type="text" data="food" value={formatTotal(item.food)} form={"buildingsForm" + index} onChange={props.onChange}></input></td>
                            <td><input className="form-control px-0" type="text" data="wood" value={formatTotal(item.wood)} form={"buildingsForm" + index} onChange={props.onChange}></input></td>
                            <td><input className="form-control px-0" type="text" data="stone" value={formatTotal(item.stone)} form={"buildingsForm" + index} onChange={props.onChange}></input></td>
                            <td><input className="form-control px-0" type="text" data="iron" value={formatTotal(item.iron)} form={"buildingsForm" + index} onChange={props.onChange}></input></td>

                            <td><input type="checkbox" data="checked" checked={item.checked} form={"buildingsForm" + index} onChange={props.onChange}></input></td>
                        </tr>
                        </React.Fragment>
                    )
                })}
                
                <tr>
                    <td></td><td></td>
                    <td>{formatTotal(totals.food)}</td>
                    <td>{formatTotal(totals.wood)}</td>
                    <td>{formatTotal(totals.stone)}</td>
                    <td>{formatTotal(totals.iron)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export class AddBuilding {

    constructor(props) {
        super(props)
    }

    onBuildChange(e) {
        console.log(e.target.value)
        f = e.target.value;

    }

    const levelOptions = () => {
        let content = [];
        let maxLevel = props.findBuildingType == 'Arsenal' ? 2 : 36;
        for(let x=1; x<maxLevel; x++) {
            content.push(<option key={x}>{x}</option>)
        }
        return content;
    }

    return (
        <div>
            <form id="buildForm" name="buildForm" onSubmit={(e) => props.onClickAdd(e)}>
                {/* <input type="text" name="type" form="buildForm"></input> */}

                {/* <select form="buildForm" onChange={e => props.onBuildingChange(e)} name="buildingList" value={props.findBuildingType}> */}
                <select form="buildForm" onChange={onBuildChange} name="buildingList" value={f}>
                    {props.buildingList.map((build, index) => {
                        return(
                            <option key={index} value={build.name}>
                                {build.name}
                            </option>
                        )
                    })
                    }
                </select>

                <select form="buildForm" name="level" form="buildForm">
                    {levelOptions()}
                </select>

                {/* <input type="number" name="level" form="buildForm"></input> */}
                <input type="number" name="food" form="buildForm"></input>
                <input type="number" name="wood" form="buildForm"></input>
                <input type="number" name="stone" form="buildForm"></input>
                <input type="number" name="iron" form="buildForm"></input>
                <button type="submit" form="buildForm">Add</button>
            </form>
        </div>
    )
}