import React, {useState, useEffect, useCallback} from "react";
import ReactDOM from "react-dom";

import {popup, getAccounts, MySelect} from "../../helpers";
import { AddAccount } from "./AddAccount";
import { RenameAccount } from "./RenameAccount";
import { DeleteAccount } from "./DeleteAccount";

import {promise_test, confirm_popup} from "../../helpers";

function Accounts() {
    const [acList, updateAccount] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useReducer(() => ({}))[1]

    const u = () => useEffect(() => {
        async function getaaa() {
            await getAccounts()
                .then(response => {
                    updateAccount(response);
                })
        }
        getaaa();
    }, []);

    u();

    function handleAddAccount() {
        console.log("clicked");

        let acName = document.getElementById('name').value;
        
        // popup("error", "other title", "ff").then();

        // confirm_popup("will this work", "and sopme text")
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(response => {
        //         console.log(response);
        //     })

        confirm_popup("Adding account", "Are you sure")
            .then(() => {
                if(acName) {
                    fetch(`account/add/${acName}`)
                        .then(response => response.json())
                        .then(info => { 
                            if(info.error){
                                popup("error", "other title", info.error);
                            } else {
                                console.log(info)
                                popup("success", "New Account Added", info.success);

                                getAccounts()
                                    .then(response => {
                                    updateAccount(response);
                                });
                                
                            }
                        })
                }
            })
            .catch(()=>{
                console.log("not saving account");
            })
    }

    function handleRenameAccount() {
        console.log("clicked rename");

        let newName = document.getElementById('renameInput').value;
        let selected = document.getElementById('renameSelect').value;
        console.log(newName, selected);

        if(newName) {
            let bob = [...acList];
            bob[selected].name = newName;
            let id = bob[selected].id
            updateAccount(bob);
            fetch(`account/update/${id}/${newName}`)
                .then(response => response.text())
                .then(text => console.log(text));

        }
    }

    function handleDeleteAccount() {
        let deleteSelect = document.getElementById('deleteSelect');
        confirm_popup("Deleting account " + deleteSelect[deleteSelect.selectedIndex].text, "Are you sure")
            .then(() => {
                let selected = deleteSelect.value;
                let ac_id = acList[selected].id;
                console.log("deleting ", ac_id);
                fetch(`account/remove/${ac_id}`)
                    .then(response => response.text())
                    .then(text => {
                        console.log(text);
                        getAccounts()
                            .then(response => {
                                updateAccount(response);
                            });
                    });
            })
            .catch(() => {
                console.log("Delete cancelled")
            })
    }

    return (
        <div>
            <AddAccount id="name" onClick={handleAddAccount}/>
            <RenameAccount list={acList} onClick={handleRenameAccount}/>
            <DeleteAccount list={acList} onClick={handleDeleteAccount}/>
            {acList.map((item, index) => {
                return(
                    <li key={index}>{item.name}</li>
                )
            })}
        </div>
    )
}

if(document.getElementById('accountroot')) {
    ReactDOM.render(<Accounts />, document.getElementById('accountroot'));
}

export function getAc() {
    let [acData, setAccounts] = useState([]);
    useEffect(() => {
        async function getaaa() {
            await getAccounts()
                .then(response => {
                    setAccounts(response);
                })
        }
        getaaa();
    }, []);

    return [acData]
}