import React, { useState, useEffect } from "react";


export function Ang() {
    const [state, setState] = useState({
        inputValue: "first",
        values: {days: 89, hours: 14},
        value: "go - "
    })

    useEffect(() => {
        console.log("fired from callback", state);
    }, [state])
    // const [inputValue, setInputValue] = useState('');
    // const [values, setValues] = useState({days:"", hours:4});
    return (
        <>  
            <input onChange={e=>{
                // Both of these 'object' copy methods work just fine
                // let newState = Object.assign({}, state);
                // let newState = ({...state});
                // newState.inputValue = e.target.value;
                // newState.values.days = Date.now();
                setState({...state, inputValue:e.target.value });
                // console.log(state);     // This is fired before the state is actually updated

                // setState(state => ({...state, }))
                setState(prevState => ({        // This works a charm
                    ...prevState,
                    values:{...prevState.values, days:52}
                }))
                console.log("fored from onchange", state);     // This is fired before the state is actually updated
                // }))                
                // setState({...state,
                // state:{values:{days:56}}}
                // )
                
                
            }}
            value={state.inputValue}/>
            <p>{state.values.days}</p>
            <p>{state.value}</p>
        </>
    )    
    // const [inputValue, setInputValue] = useState('');
    // const [values, setValues] = useState({days:"", hours:4});
    // return (
    //     <>  
    //         <input onChange={e=>{
    //             // Both of these methods work for nested objects
    //             let newState = Object.assign({}, values);
    //             newState.days = values.days + e.target.value + ' | ';
    //             setValues(newState);
    //             setValues({...values, days:values.days + e.target.value + ' | '}); 
    //             setInputValue(e.target.value);
    //             }
    //             } value={inputValue}/>
    //         <p>{values.days}</p>
    //     </>
    // )
}