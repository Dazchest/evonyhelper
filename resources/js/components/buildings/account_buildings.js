import React from "react";


export function AccountBuildings(props) {

    let acBuildings = props.buildings;
    // console.log(acBuildings);

    return(
        <div>these are the account buildings
            <button onClick={props.onBack}>Back</button>
            {acBuildings.map((build,index) => {
                return(
                    <li key={index}>
                        {build.name}
                        <input index={index} data={build.type} onChange={props.onChange} value={build.level} type="number"></input> 
                    </li>
                )
            })
            }

            <button onClick={props.onBack}>Back</button>
        </div>
    )
}

export function BuildingList(props) {
    // console.log("b", props.buildingList);
    return (
        <select form={props.form} onChange={props.onChange} name="buildingList" value={props.findBuildingType}>
            {props.buildingList.map((build, index) => {
                return(
                    <option key={index} value={build.type}>
                        {build.name}
                    </option>
                )
            })
            }
        </select>
    )
}