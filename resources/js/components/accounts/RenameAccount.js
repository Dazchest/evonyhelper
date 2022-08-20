import React from "react";

export function RenameAccount(props) {
    console.log(props.list);
    return (<>
        <div>
            <form name="renameForm">
                <span>Rename Account</span>
                <select form="renameForm" id="renameSelect">
                    {props.list.map((item, index) => {
                        return (
                            <option value={index} key={index}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <input form="renameForm" type="text" id="renameInput"></input>
                <button form="renameForm" onClick={props.onClick}>rename</button>
            </form>
        </div>
    </>);
}
