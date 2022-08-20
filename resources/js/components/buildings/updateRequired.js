import React, { Component } from 'react';
import { BuildingList } from './account_buildings';
import Axios from 'axios';


export class UpdateRequired extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentType: 1,
            currentLevel: 5,
            currentIndex: 0,
            buildingValues: [{"name":"Keep"}],
            requiredList: [],
        }
    }

    componentDidMount() {
        this.getBuildingData(this.state.currentType, this.state.currentLevel);
    }

    getBuildingData(type, level) {
        fetch(`buildings/editrequired/${type}/${level}`)
            .then(res => res.json())
                .then(res => {
                    console.log("required = ", res);
                    this.setState({buildingValues: res});
                })
    }

    handleBuildingChange(e) {
        if(e.target.name == "buildingList") {
            this.setState({currentType: e.target.value}, () => {
                this.getBuildingData(this.state.currentType, this.state.currentLevel);
            })
        }
        if(e.target.name == "level") {
            this.setState({currentLevel: e.target.value}, () => {
                this.getBuildingData(this.state.currentType, this.state.currentLevel);
            })
        }
    }

    handleChangeRequired(e) {
        let row = e.target.parentElement.parentElement.rowIndex;
        if(e.target.name == "buildingList") {
            let newState = Object.assign({}, this.state);
            newState.buildingValues[row].type = e.target.value;
                this.setState(newState, () => {
            });
        }
        if(e.target.name == "level") {
            let newState = Object.assign({}, this.state);
            newState.buildingValues[row].level = e.target.value;
                this.setState(newState, () => {
            });
        }
        if(e.target.name == "remove") {
            let newState = Object.assign({}, this.state);
            newState.buildingValues.splice(row, 1);
                this.setState(newState, () => {
            });
        }
    }

    handleAdd(e) {
        e.preventDefault();
        let el = e.target.form.elements;
        let type = el.buildingList.value;
        let level = el.level.value;
        // Lets check to make sure we cant add the same type and level
        let bob = this.state.buildingValues.find(o => {return o.type == type && o.level == level});
        console.log(bob);
        if(bob == null) {
            console.log("is bob ", bob);
            let newState = Object.assign({}, this.state);
            newState.buildingValues.push({"type":type, "level":level});
            this.setState(newState);
        } else {
            console.log("this type of building and its level are already in the list");
        }
    }

    handleSave() {
        let saveDelay = 300;
        if(this.bob) {
            clearTimeout(this.bob);
        }
        this.bob = setTimeout(() => {
            console.log("timer");
                let data = {};
                data.type = this.state.currentType;
                data.level = this.state.currentLevel;
                data.required = JSON.stringify(this.state.buildingValues);
                console.log(data);
                // return;
                const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
                console.log("saving to building", this.state.currentType, this.state.currentLevel);
                fetch(`buildings/saverequired`, {
                    method: 'POST',
                    headers: {
                        credentials: "same-origin",
                        "X-CSRF-Token": csrfToken,
                        mode: 'no-cors',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({data: data}),
                })
                    .then(response => response.text())
                    .then(response => {
                        console.log("saved  ........." + response);
                    })
            
        }, saveDelay);
    }

    render() {
        let buildingValues = this.state.buildingValues;;
        return (
            <div>
                inside update required
                <button onClick={this.props.onBack}>Back</button>

                <hr></hr>
                <BuildingList 
                    buildingList = {this.props.buildingList}
                    onChange = {e=>this.handleBuildingChange(e)}
                    findBuildingType = {this.state.currentType}
                />
                <select name="level" value={this.state.currentLevel} onChange={e=>this.handleBuildingChange(e)}>
                    {this.props.levels}
                </select>

                <hr></hr>
                <table>
                    <tbody>
                    {buildingValues.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td>
                                    <BuildingList 
                                        buildingList = {this.props.buildingList}
                                        onChange = {e=>this.handleChangeRequired(e)}
                                        findBuildingType = {item.type}
                                    />
                                </td>
                                <td>
                                    <select name="level" value={item.level} onChange = {e=>this.handleChangeRequired(e)}>
                                        {this.props.levels}
                                    </select>
                                </td>
                                <td>
                                    <button onClick = {e=>this.handleChangeRequired(e)} name="remove">Remove</button>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>
                            <button onClick = {e=>this.handleSave(e)}>Save</button>
                        </td>
                    </tr>
                    <tr>
                        <td><form id="addForm"></form>
                        <select form="addForm" name="buildingList" >
                            {this.props.buildingList.map((build, index) => {
                                return(
                                    <option key={index} value={build.type}>
                                        {build.name}
                                    </option>
                                )
                            })
                            }
                        </select>
                        </td>
                        <td>
                            <select form="addForm" name="level" onChange = {()=>{}}>
                                {this.props.levels}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button form="addForm" onClick={e=>this.handleAdd(e)}>Add</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}