import React, { Children } from "react";
import {useState, useContext} from "react";


// const helper = useState(200);
export const HelpersContex = React.createContext(2);

// Provider
export const HelpersProvider = (props) => { 

    const helperState = useState(
        {
            convertMinutes: 3,
            test: "hello world",
            testFunction: () => {console.log("test function");},
            seperateFunction: seperateFunction,
        }
    )
    const helperValues = 
        {
            convertMinutes: 777,
            test: "hello world",
        }
    
    function seperateFunction() {
        console.log("seperate function")
    }

    return(
        <HelpersContex.Provider value={helperState}>
            {props.t}
            {props.children}
        </HelpersContex.Provider>
    )
    }


{/* export default HelperContext; */}