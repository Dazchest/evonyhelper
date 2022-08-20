import React from "react";

export function DeleteAccount(props) {
    console.log(props.list);
    return (<>
        <div>
            <form name="deleteForm">
                <span>Delete Account</span>
                <select form="deleteForm" id="deleteSelect">
                    {props.list.map((item, index) => {
                        return (
                            <option value={index} key={index} disabled={index == 0 ? true : false}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <button form="deleteForm" onClick={props.onClick}>Delete</button>
            </form>
        </div>
    </>);
}
