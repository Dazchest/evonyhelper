import React, { Component} from "react";
import { BuildingList } from "./account_buildings";
import { EditCell } from "../../helpers";



export class UpdateValues extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentType: 1,
            currentIndex: 0,
            buildingValues: [{"name":"Keep"}],
        }
    }

    componentDidMount() {
        this.getBuildingData(1);

    }

    getBuildingData(type) {
        fetch(`/buildings/editvalues/${type}`)
            .then(res => res.json())
            .then(res => {
                this.setState({buildingValues: res});
            })
    }

    handleBuildingChange(e) {
        this.getBuildingData(e.target.value);
        console.log(e.target.selectedIndex);
        this.setState({currentType: e.target.value});
        this.setState({currentIndex: e.target.selectedIndex});
    }

    handleChangeValue(e) {
        // console.log("name = ", e.target.name);
        // console.log("level2 = ", e.target.attributes.level.value);
        // console.log("form = ", e.target.form.elements)

        let name = e.target.name;
        let level = e.target.attributes.level.value;
        let value = e.target.value;
        let data = new FormData();
        data.append("hello","world");
        // console.log("formdata", data);

        data = new URLSearchParams(new FormData(e.target.form));
        // console.log("urlformdata", data);

        let newState = Object.assign({}, this.state);
        newState.buildingValues[level-1][name] = value;
        this.setState(newState, this.saveValues(data));    //
    }

    saveValues(data) {
        let saveDelay = 1500;
        if(this.bob) {
            clearTimeout(this.bob);
        }
        this.bob = setTimeout(() => {
            console.log("timer");
            // let data = {"hello":"world"};
            const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
            
            fetch(`/buildings/updatevalues`, {
                method: 'POST',
                headers: {
                    credentials: "same-origin",
                    "X-CSRF-Token": csrfToken,
                    mode: 'no-cors',
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                // body: JSON.stringify({data: data}),
                // body: {data: JSON.stringify({data: "hello"})},
                // body: JSON.stringify(data),
                body: data,
            })
                .then(response => response.json())
                .then(response => {
                    console.log("saved  .........", response);
                })

        }, saveDelay);
    }

    b() {}

    render() {
        return (
            <div>
                <BuildingList 
                    buildingList = {this.props.buildingList}
                    onChange = {e=>this.handleBuildingChange(e)}
                    findBuildingType = {this.state.currentType}
                />
                <button onClick={this.props.onBack}>Back</button>
                {/* <h3>{this.state.buildingValues[this.state.currentIndex].name}</h3> */}
                <table className="table">
                    <thead className="table-info">
                        <tr>
                            <td>Level</td>
                            <td>Food</td>
                            <td>Wood</td>
                            <td>Stone</td>
                            <td>Iron</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.buildingValues.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td>{item.level}
                                        <form id={"val"+index}>
                                            <input type="hidden" value={item.id} name="id" onClick={(e)=>{this.b}}/>
                                        </form>
                                    </td>
                                    <td><input style={{width:100}} form={"val"+index} type="number" name="food" level={item.level} value={item.food ? item.food: 0} onChange={(e)=>this.handleChangeValue(e)}/></td>
                                    <td><input style={{width:100}} form={"val"+index} type="number" name="wood" level={item.level} value={item.wood ? item.wood: 0} onChange={(e)=>this.handleChangeValue(e)}/></td>
                                    <td><input style={{width:100}} form={"val"+index} type="number" name="stone" level={item.level} value={item.stone ? item.stone: 0} onChange={(e)=>this.handleChangeValue(e)}/></td>
                                    <td><input style={{width:100}} form={"val"+index} type="number" name="iron" level={item.level} value={item.iron ? item.iron: 0} onChange={(e)=>this.handleChangeValue(e)}/></td>
                                    <td><input style={{width:100}} form={"val"+index} type="number" name="time" level={item.level} value={item.time ? item.time: 0} onChange={(e)=>this.handleChangeValue(e)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={this.props.onBack}>Back</button>
            </div>
        )
    }
}