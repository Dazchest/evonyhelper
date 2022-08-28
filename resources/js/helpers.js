export function formatTime(t) {
    let days = Math.floor(t/(60*60*24));
    let hours = Math.floor(t/(60*60)) % 24;
    let minutes = Math.floor(t/(60)) % 60;
    let seconds = Math.floor(t) % 60;

    t = "";
    t += days ? days>1 ? `${days} d - ` : `${days} d - ` : "";
    t += hours ? hours>1 ? `${hours} h - ` : `${hours} h - ` : "";
    t += minutes && days<10 ? minutes>1 ? `${minutes} m - ` : `${minutes} m - ` : "";
    t += seconds && days==0 ? seconds>1  ? `${seconds} s` : `${seconds} s` : "";

    return t;
}

import React, { Component, useState } from "react"
import ReactDOM from "react-dom";

export function setDom(C, divId) {
    
    if (document.getElementById(divId)) {
        ReactDOM.render(
            <C />, document.getElementById(divId)
        )
    } else {
        console.log("error, " + divId + " not found");
    };
}


export function Example(p) {
    console.log(p);
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export async function getAccounts() {
    // console.log("fetching things");
    let rdata = [];
    await fetch('account/get')
        .then(response => response.json())
        .then(data => {
            console.log("accounts123 = " , data);
            rdata = data;
        });
        // console.log("rdata = " , rdata);
    return rdata
}

export async function getData(dataType, acId, rd, callback) {
    // console.log("fetching " + dataType);
    let rdata = [];
    await fetch(`${dataType}/${acId}`)
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json()
                .then(data => {
                    // console.log("first data is ", data)
                    if(data.length > 0) {
                        rdata = JSON.parse(data[0].data);
                        // console.log("response data = " , rdata);
                    } else {
                        // console.log("callback is = ");
                        if(callback) {
                            let r = callback();
                            rdata = r;
                        }
                    }
                });
        
            } else {
                console.log("no valid json")
            }
        })
        // console.log("rdata = " , rdata);
        return rdata
}

export  function loadFromStorage(ac, name, data, callback) {
    let savedData;

    // Load account info
    if(localStorage.hasOwnProperty("ac")) {
        ac = JSON.parse(localStorage.getItem("ac"));
    }
    //--------------------------

    // Load data - e.g  rssData or troopData
    if(data && ac) {  // Check we want to load some data
        if(localStorage.hasOwnProperty(name)) {
            data = JSON.parse(localStorage.getItem(name));
            
            if(ac.length != data.length) {
                for(let x=0; x<ac.length - data.length; x++) {
                    callback(data);
                }
                localStorage.setItem(name, JSON.stringify(data));
            }
        } else {
            for(let x=0; x<ac.length; x++) {    // Setup the res for each account, on first create
                callback(data);
            }
            localStorage.setItem(name, JSON.stringify(data));
        }
    }


    return {ac: ac, savedData: data}
}


export function MySelect(props) {

    // console.log("props list = ", props.list);

    return (
        <div>
            <select id={props.id}>
                {props.list.map((item, index) => {
                    return (
                        <option key={index} value={item.id}>{item.name}</option>
                    )
                })}

            </select>
        </div>
    )
}


export function AccountSelect(props) {
    // console.log("insdide accounts select component");
    if(props.acList.length == 0) {
        return (
            <span>no acc</span>
        )
    }

    return (
        <div>
        <select onChange={props.onChange} value={props.currentAC}>
        {/* <select onChange={onChange} value={props.currentAC}> */}
            {props.acList.map((ac, index) => {
                return (
                <option key={index} value={ac.id} >
                    {ac.name}
                </option>
                )
            })
            };
        </select>
    </div>

    )
}

/**
 * 
 * @param {string} type Error or success
 * @param {string} title Title of the popup
 * @param {string} message Message to display
 */

export function promise_test(bob) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(bob);
        },3000);
    })
}

export function confirm_popup(title, message, customButtons) {
    return new Promise((resolve, reject) => {
        const standardButtons = [
            {
                text: "cancel",
                callback: function(){console.log("callback 1"); reject("clicked cancel");},
            },
            {
                text: "ok",
                callback: function(){console.log("callback 2"); resolve("cicked ok");},
            }
        ]

        const buttons = customButtons ? customButtons : standardButtons;
    
        $('#myModal').on('show.bs.modal', function(e) {
            $('.modal-header').css("background-color", "#55ff66");
            $('.modal-title').text(title);
            $('.modal-body p').text(message);
            $('.modal-footer').html("");

            buttons.forEach((button)=> {
                // console.log(button.text);
                // button.callback();
                let newButton = document.createElement('button');
                newButton.innerText = button.text;
                newButton.addEventListener('click', function(){
                    $('#myModal').modal('hide');
                    // return button.callback();
                    button.callback();
                })
                $('.modal-footer').append(newButton);
            })
        });

        $('#myModal').modal('show');

        // resolve("hollaballoo");
    });
}

/**
 * 
 * @param {string} type Error or success
 * @param {string} title Title of the popup
 * @param {string} message Message to display
 */

export function popup(type, title, message) {
    const buttons = [
        {
            text: "ok",
            callback: function(){console.log("callback ok"); return true;},
        }
    ]    
    $('#myModal').on('show.bs.modal', function(e) {
        if(type == "error") {
            $('.modal-header').css("background-color", "red");
            $('.modal-title').text("Error");
        } else {
            $('.modal-header').removeAttr('style');
            $('.modal-header').css("background-color", "green");
            $('.modal-title').text(title);
        }
        $('.modal-body p').text(message);
        $('.modal-footer').html("");
        const buttonResponse = false;;
        buttons.forEach((button)=> {
            let newButton = document.createElement('button');
            newButton.innerText = button.text;
            newButton.addEventListener('click', function(){
                $('#myModal').modal('hide');
                // return button.callback();
            })
            $('.modal-footer').append(newButton);
        })
    });
    $('#myModal').modal('show', ()=>{
    });

}

export function formatTotal(total) {
    let newTotal = total > 999 ? total > 99999 ? total > 999999 ? total > 99999999 ? total > 999999999 ? `${(total / 1000000000).toFixed(1)}b` : `${(total / 1000000).toFixed(0)}m` : `${(total / 1000000).toFixed(1)}m` : `${(total / 1000).toFixed(0)}k` : `${(total / 1000).toFixed(1)}k` : total;
    return newTotal;
}

/**
 * Creates an Editable Table Cell <td>
 * New attributes returned are formattedValue 
 * 
 * @param {*} props 
 * @param {*} value required
 * @param {*} originalValue required
 * @param {number} row think of it as the row in your list/sheet etc
 * @param {*} col think of it as the col in your list/sheet etc
 * @param {string} type - default is number   
 * @param {*} data
 * @param {function} onEditChange required
 */
export const EditCell = (props) => {

    function checkEnter(e) {
        if(e.which === 13) {
            e.preventDefault();
            e.target.blur();
        }
    }
    function checkFormat(e) {
        let value = e.target.innerText;
        // console.log("first", value);
        if(e.target.attributes.type && e.target.attributes.type.value == "number") {  // Format if its a number
            value = value.replace(/\s/g, "").replace(/\D+/g, '').replace(/\b0+/g, '');
        }
        value ? value : value = 0; 
        e.target.innerText = formatTotal(value); 
        e.target.setAttribute("formattedValue", value)
        // console.log("second", value);
    }
    function setOriginalValue(e) {
        if(props.originalValue) {
            // console.log("setting original value " , props.originalValue);
            e.target.innerText = props.originalValue;
        }
    }
    return(
        <td 
            type = {props.type ? props.type : "number"}
            row = {props.row} 
            col = {props.col} 
            data = {props.data ? props.data : null}
            // onFocus = {e=>setOriginalValue(e)}            
            onFocus = {e=>e.target.innerText = props.originalValue}            
            // onFocus = {props.originalValue ? 
            //             (e)=>{e.target.innerText = props.originalValue} :
            //             (e)=>{e.target.innerText = props.value}
            //     } 
            contentEditable = {true} 
            onKeyPress = {checkEnter}
            onBlur = {(e) => {checkFormat(e), props.onEditChange(e)}} 
            suppressContentEditableWarning = {true}
        >
            {props.value}
        </td>
    )
}


/**
 * Accepts an Object of parameters
 * @param  {string} url - required
 * @param  {*} data - required
 * @param  {int} saveDelay default is 1500ms - optional
 * @param  {string} method default is GET - optional
 * @param  {boolean} logResponse default is true
 * 
 * if data contains any iformation, then the method wil auatomatically be POST
 */
export const saveValuesHelper = 
{
    sav: null,
    async save({url, data, saveDelay=1500, method='get', callback, logResponse=true, loggedIn=false}) {
        if(!loggedIn) {
            // popup("error", "", "Please log in to save");
            // console.log("toast 1")
            $('.toast').toast({delay:2000});
            $('.toast').toast('show');
            // console.log("toast 2")
            return;
        }
        if (this.sav) {
            clearTimeout(this.sav);
        }
        if(data) {
            method = "post";
        }
        this.sav = setTimeout(() => {
            axios[method](url, { data })
                .then(response => {
                    if(logResponse) {
                        console.log("saved  ......", response.data);
                        if(callback) {
                            callback(response.data);
                        }
                    }
                })
                .catch(error => {
                    console.log("error message = ", error.message);
                    if(error.response) {
                        console.log("error message from the server = ", error.response.data.message);
                    }
                })
        }, saveDelay);
    },

}
// This is the same as saveValuesHelper, but as a class
export class saveValuesHelper2 {
    static save({url, data, saveDelay=1500, method='get', logResponse=true}) {
        if (this.bob) {
            clearTimeout(this.bob);
        }
        if(data) {
            method = "post";
        }
        this.bob = setTimeout(() => {
            axios[method](url, { data })
                .then(response => {
                    if(logResponse) {
                        console.log("saved  .........", response.data);
                    }
                })
                .catch(error => {
                    if(error.response) {
                        console.log("error message = ", error.message);
                        console.log("error message from the server = ", error.response.data.message);
                    }
                })
        }, saveDelay);
        console.log("saving")
    }
}

export function LoadingSpinner() {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"> Loading...</span>
            </div>
            <br></br>
            <h2 className="text-primary"> Loading...</h2>
        </div>
    )
}

export function UpdatingSpinner(props) {
    console.log("updatinSpinner props = ", props);
    let visibility = "hidden";
    if(props.updating) {
        visibility = "visible";
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:'#fff',opacity:'.5', position:"fixed", top:'0', left:'0', width:'100%', height:'100%', visibility:visibility, zIndex:'999'}}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"> Updating...</span>
            </div>
            <br></br>
            <h2 className="text-primary"> Updating...</h2>
        </div>
    )
}

export function Toast(message) {

}