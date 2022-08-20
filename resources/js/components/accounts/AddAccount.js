import React from "react";
export function AddAccount(props) {
    return (<>
        <label>Add Account</label>
        <input type="text" id={props.id}></input>
        <button onClick={props.onClick}>add</button>
    </>);
}
