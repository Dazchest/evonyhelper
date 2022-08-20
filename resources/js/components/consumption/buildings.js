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
                            <td><button value={index} onClick={props.onClickRemove}>Remove</button></td>
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

export class AddBuilding extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            findBuildingType: "Keep",
            buildingInfo: {"food":10,"wood":0,"stone":0,"iron":0},
        }
    }

    levelOptions() {
        let content = [];
        let maxLevel = this.state.findBuildingType == 'Arsenal' ? 2 : 36;
        for(let x=1; x<maxLevel; x++) {
            content.push(<option key={x}>{x}</option>)
        }
        return content;
    }

    onBuildChange(e) {
        // console.log("named = ", e.target.form.buildingList.selectedOptions[0].text)
        // console.log("typed = ", e.target.form.buildingList.value)
        // console.log(e.target.selectedOptions[0].text)
        // console.log(e.target.value)

        let type = e.target.form.buildingList.value;
        let level = e.target.form.level.value;

        fetch(`buildings/getbuildinginfo/${type}/${level}`)
            .then(res => res.json())
            .then(res => {
                console.log("res ", res);
                res.food = res.food ? res.food : 0;
                res.wood = res.wood ? res.wood : 0;
                res.stone = res.stone ? res.stone : 0;
                res.iron = res.iron ? res.iron : 0;
                this.setState({buildingInfo: res})
            })
    }

    handleChangeValue(e) {
        // console.log(e.target.value, e.target.name)
        let newState = Object.assign({}, this.state);
        newState.buildingInfo[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render() {
        return (
            <div className="card">
                <form id="buildForm" name="buildForm" onSubmit={(e) => this.props.onClickAdd(e)}>

                    <select form="buildForm" onChange={(e)=>this.onBuildChange(e)} name="buildingList" >
                        {this.props.buildingList.map((build, index) => {
                            return(
                                <option key={index} name={build.name} value={build.type}>
                                    {build.name}
                                </option>
                            )
                        })
                        }
                    </select>

                    <select onChange={(e)=>this.onBuildChange(e)} form="buildForm" name="level" form="buildForm">
                        {this.levelOptions()}
                    </select>

                    <input onChange={e=>this.handleChangeValue(e)} value={this.state.buildingInfo.food} type="number" name="food" form="buildForm"></input>
                    <input onChange={e=>this.handleChangeValue(e)} value={this.state.buildingInfo.wood} type="number" name="wood" form="buildForm"></input>
                    <input onChange={e=>this.handleChangeValue(e)} value={this.state.buildingInfo.stone} type="number" name="stone" form="buildForm"></input>
                    <input onChange={e=>this.handleChangeValue(e)} value={this.state.buildingInfo.iron} type="number" name="iron" form="buildForm"></input>

                    <button type="submit" form="buildForm">Add</button>
                </form>
            </div>
        )
    }
}