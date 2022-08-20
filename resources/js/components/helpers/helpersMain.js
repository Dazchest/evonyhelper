import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom";

import {Example, getAccounts, formatTime} from "../../helpers";
import {AddAccount, ChangeAccountName, ChangeAccountName2, ShowDeleteAccount} from "./account";
import {HelpersContex, HelpersProvider} from "./HelpersContex";
import {formatTotal} from "../../helpers";

const Helpers = () => {

    const helper = useState(200);
    const title = "Some Helper Functions";
    // const helper2 = useState({one:1, two:2, formatTime:formatTime});

    return (
        // <HelpersContex.Provider value={[helper, helper2]}>
        <HelpersProvider t="2">
            <div className="container">
                <h1>{title}</h1>

                <MinutesConvert />
                <CalcBuildSpeed />
            </div>
        {/* // </HelpersContex.Provider> */}
        </HelpersProvider>
    )
}


export const MinutesConvert = () => {

    // const [minutes, changeMinutes] = useState(0);    // We dont need to use state locally
    const [helperValue, setHelperValue] = useContext(HelpersContex);
    // const helperValue = useContext(HelpersContex);   // This can work, but doesnt update dom straight away
    const { testFunction, seperateFunction } = helperValue;
    console.log(testFunction);

    function handleMinutesChange(e) {
        setHelperValue({...helperValue, convertMinutes: e.target.value})
        // changeMinutes(e.target.value);  //(e)=>{return e.target.value}
    }

    function updateHelperState(e) {
        setHelperValue((prevState) => ({        // This works fine
            ...prevState,
            convertMinutes: 99,
            test: "goodbye"
          }));     
          
        // setHelperValue({...helperValue, convertMinutes: 666});   // This works fine
        // helperValue.convertMinutes = 987;         // This doesn't fully work
        console.log(helperValue);
    }
            
    // useEffect(() => {
    //     console.log("use effect");
    //     // changeMinutes();
    // },[]);

   

    return (
        <div>
            <div className="card">
                <label>Convert minutes to, ermmm, something else</label>    
                <input className="col-3" type="number" value={helperValue.convertMinutes} onChange={e => setHelperValue({...helperValue, convertMinutes: e.target.value})}/>
                <span>{formatTime(helperValue.convertMinutes * 60)}</span>
                <button onClick={updateHelperState}>update</button>
                <button onClick={testFunction}>test function</button>
                <button onClick={seperateFunction}>seperate function</button>
            </div>

        </div>
    )
}

export const CalcBuildSpeed = () => {

    const [currentSpeed, setCurrentSpeed] = useState(277);
    const [currentTime, setCurrentTime] = useState({"days": 540, "hours": 10, "minutes": 0});     // current time in {D,H,M}
    const [currentMinutes, setCurrentMinutes] = useState(0);

    const [newSpeed, setNewSpeed] = useState(300);
    const [newMinutes, setNewMinutes] = useState(0);
    const [timeSaved, setTimeSaved] = useState(0);

    // const [helperValue, setHelperValue] = useContext(HelpersContex)[1];
    // console.log(helperValue);

    function handleCurrentTimeChange(e) {
        let ct = Object.assign({}, currentTime);
        ct[e.target.name] = e.target.value;
        setCurrentTime(ct);
    }

    useEffect(() => {           // Update the current minutes
        let minutes =  Number(currentTime.days*60*24) + Number(currentTime.hours*60) + Number(currentTime.minutes);
        setCurrentMinutes(minutes);
    }, [currentTime]);

    useEffect(() => {           // Calculate new time
        let nm = (currentMinutes * (1+(currentSpeed/100))) / (1+(newSpeed/100));
        setNewMinutes(nm);
    }, [currentMinutes, currentSpeed, newSpeed]);

    // useEffect(() => {
    //     setTimeSaved(currentMinutes - newMinutes);
    // }, [newMinutes]);
    useEffect(() => {
        setTimeSaved(currentMinutes - newMinutes);
    }); //{helperValue.one}

    return (
        <div className="card mt-2">
            <h2>Construction Speed - </h2>
            <label>Input current build speed</label>
            <input className="col-3" type="number" speed="currentSpeed" value={currentSpeed} onChange={e=>setCurrentSpeed(e.target.value)}/>
            <div className="input-group">
                days <input className="col-2" type="number" time="currentTime" name="days" value={currentTime.days} onChange={handleCurrentTimeChange}/>
                hours <input className="col-2" type="number" time="currentTime" name="hours" value={currentTime.hours} onChange={handleCurrentTimeChange}/>
                minutes <input className="col-2" type="number" time="currentTime" name="minutes" value={currentTime.minutes} onChange={handleCurrentTimeChange}/>
            </div>
            <span>{formatTime(currentMinutes * 60)}</span>

            <label className="mt-2">Input new build speed</label>
            <input className="col-3" type="number" speed="newSpeed" value={newSpeed} onChange={e=>setNewSpeed(e.target.value)}/>
            <h4>New Build Time is {formatTime(newMinutes * 60)}</h4>
            <h5>Thats a saving of {formatTime(timeSaved * 60)}</h5>
        </div>
    )
}

import { setDom } from "../../helpers.js";
setDom(Helpers, 'helpersroot');