import React, { Component} from "react";
import { BuildingList } from "./account_buildings";
import { EditCell, formatTotal, saveValuesHelper } from "../../helpers";
import axios from "axios";



export class UpdateValues extends Component {

    constructor(props) {
        super(props)

        this.newBuilding = {};

        this.state = {
            currentType: 1,
            currentIndex: 0,
            buildingValues: [{"name":"Keep"}],
        }
    }

    componentDidMount() {
        this.getBuildingData(1);

    }

    async getBuildingData(type) {
        let data;
        // fetch(`/buildings/editvalues/${type}`)
        //     .then(res => res.json())
        //     .then(res => {
        //         this.setState({buildingValues: res});
        //     })
        console.log(1);
        // data = (await axios.get(`/buildings/editvalues/${type}`)).data;
        // this.setState({buildingValues: data});
        console.log(2);

        axios.get(`buildings/editvalues/${type}`)
            .then(res => this.setState({buildingValues: res.data}));
        console.log(3);

        // axios.get(`/buildings/test`)
        //     .then(res => {
        //         console.log(res);
        //         // res.request.onerror(console.log("poop"));
        //     })

        // Fetch the data straight in
        let bob =  (await axios.get(`buildings/test`)).data;  // await for response and then get data
        console.log(bob);
        data = (await axios.get(`buildings/test`)).data;
        console.log(data);
    }



    handleBuildingChange(e) {
        this.getBuildingData(e.target.value);
        console.log(e.target.selectedIndex);
        this.setState({currentType: e.target.value});
        this.setState({currentIndex: e.target.selectedIndex});
    }

    handleChangeValue(e) {
        
        let col = e.target.attributes.col.value;
        let row = e.target.attributes.row.value;
        let value = e.target.attributes.formattedValue.value

        let newState = Object.assign({}, this.state);
        newState.buildingValues[row][col] = value;
        // this.setState(newState, this.saveValues(this.state.buildingValues[row], 500));    //
        // this.setState(newState, saveValuesHelper.save(`/buildings/updatevalues`, this.state.buildingValues[row], 500));    //
        this.setState(newState, async () => {
            console.log(this.state.buildingValues[row]);
            await saveValuesHelper.save({
                url: `buildings/updatevalues`, 
                data: this.state.buildingValues[row], 
                method: "get",
                saveDelay: 1000,
                loggedIn: true,
                // logResponse: false,
            })
        });
    }


    handleChangeNewValue(e) {
        let rowAttr = e.target.attributes;
        console.log(rowAttr);

        this.newBuilding[rowAttr.col.value] = rowAttr.formattedValue.value;

        console.log(this.newBuilding);
    }
    saveNew(e) {
        // console.log("index= ", this.state.currentIndex)
        // console.log(this.state.buildingValues[this.state.currentIndex].name);
        // return;
        this.newBuilding.type = this.state.currentType;
        this.newBuilding.name = this.state.buildingValues[this.state.currentIndex].name;
        saveValuesHelper.save({
            url: `buildings/updatevalues`, 
            data: this.newBuilding, 
            method: "get",
            saveDelay: 1000,
            loggedIn: true,
            // logResponse: false,
        });
    }


    
    // saveValues(data, saveDelay=1500) {
    //     if(this.bob) {
    //         clearTimeout(this.bob);
    //     }
    //     this.bob = setTimeout(() => {
    //         console.log("timer");
    //         axios.post(`/buildings/updatevalues`, {data})
    //             .then(response => {
    //                 console.log("saved  .........", response);
    //             })
    //     }, saveDelay);
    // }


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
                                    <td>{item.level}</td>
                                    <EditCell 
                                        type = "number"
                                        row = {index}
                                        col = "food"
                                        value = {formatTotal(item.food ? item.food: 0)}
                                        originalValue = {item.food ? item.food: 0}
                                        onEditChange = {(e)=>this.handleChangeValue(e)}
                                    />
                                    <EditCell 
                                        row = {index}
                                        col = "wood"
                                        value = {formatTotal(item.wood ? item.wood: 0)}
                                        originalValue = {item.wood ? item.wood: 0}
                                        onEditChange = {(e)=>this.handleChangeValue(e)}
                                    />
                                    <EditCell 
                                        row = {index}
                                        col = "stone"
                                        value = {formatTotal(item.stone ? item.stone: 0)}
                                        originalValue = {item.stone ? item.stone: 0}
                                        onEditChange = {(e)=>this.handleChangeValue(e)}
                                    />
                                    <EditCell 
                                        row = {index}
                                        col = "iron"
                                        value = {formatTotal(item.iron ? item.iron: 0)}
                                        originalValue = {item.iron ? item.iron: 0}
                                        onEditChange = {(e)=>this.handleChangeValue(e)}
                                    />
                                    <EditCell 
                                        row = {index}
                                        col = "time"
                                        value = {item.time ? item.time: 0}
                                        originalValue = {item.time ? item.time: 0}
                                        onEditChange = {(e)=>this.handleChangeValue(e)}
                                    />
                                </tr>
                            )
                        })}
                        <tr>
                            <EditCell 
                                type = "number"
                                row = '36'
                                col = "level"
                                value = {0}
                                originalValue = {0}
                                onEditChange = {(e)=>this.handleChangeNewValue(e)}
                            />
                            <EditCell 
                                type = "number"
                                row = '36'
                                col = "food"
                                value = {0}
                                originalValue = {0}
                                onEditChange = {(e)=>this.handleChangeNewValue(e)}
                            />
                            <EditCell 
                                type = "number"
                                row = '36'
                                col = "wood"
                                value = {0}
                                originalValue = {0}
                                onEditChange = {(e)=>this.handleChangeNewValue(e)}
                            />
                            <EditCell 
                                type = "number"
                                row = '36'
                                col = "stone"
                                value = {0}
                                originalValue = {0}
                                onEditChange = {(e)=>this.handleChangeNewValue(e)}
                            />
                            <EditCell 
                                type = "number"
                                row = '36'
                                col = "iron"
                                value = {0}
                                originalValue = {0}
                                onEditChange = {(e)=>this.handleChangeNewValue(e)}
                            />
                            <EditCell 
                                type = "number"
                                row = '36'
                                col = "time"
                                value = {0}
                                originalValue = {0}
                                onEditChange = {(e)=>this.handleChangeNewValue(e)}
                            />
                        </tr>
                        <tr>
                            <td>
                                <button onClick={(e)=>this.saveNew(e)}>Save</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <button onClick={this.props.onBack}>Back</button>
            </div>
        )
    }
}