import React, { useState, useEffect}  from "react";
import {MySelect, loadFromStorage, getAccounts, popup} from "../../helpers";

//triggered when modal is about to be shown

export function AddAccount() {
    
    function handleOnClick() {
        console.log("clicked");
        let acName = document.getElementById('name').value;
        if(acName) {
            fetch(`/account/add/${acName}`)
                .then(response => response.json())
                .then(info => { 
                    if(info.error){
                        popup("error", "other title", info.error);
                    }
                })
        }
    }

    return (
        <div className="card">
            <div className="input-group mb-3">
                <div className="input-group-prepend col-3">
                    <div className="input-group-text col-12" id="btnGroupAddon">Add Account</div>
                </div>
                <input type="text" id="name" className="form-control col-2" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                <button type="button" onClick={handleOnClick}>Add</button>
            </div>

        </div>

    )
}


export function ChangeAccountName(props) {

    let acData = loadFromStorage().ac;

    function handleChangeName() {
        let newName = document.getElementById("changeName").value;
        let id = document.getElementById("mySelect").value;
        console.log("chaning = " + JSON.parse(localStorage.getItem('ac'))[id].name)
        props.acData[id].name = newName;
        localStorage.setItem('ac', JSON.stringify(props.acData));

    }

    if(!acData) {
        return;
    }

    return (    
        <div className="card">
            <div className="input-group mb-3">
                <div className="input-group-prepend col-3">
                    <div className="input-group-text col-12" id="btnGroupAddon">Change Name</div>
                </div>
                {/* <MySelect list={props.acData} /> */}
                <input type="text" id="changeName" className="form-control col-2" placeholder="change name" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                <button type="button" onClick={handleChangeName}>Change</button>
            </div>

        </div>
    )
}

function ChangeName({ listen, children }) {

    // let acData = [{"name":"aaa"}];

    const bob = () => {
        console.log(1);
        getAccounts().then(data => {
            console.log("in change name acdata = ", data);
            setData({ acData: data, click: doChange });
        });
        console.log(2);
        // let [ data, setData ] = useState({ acData: [{"name":"aaa"}], click: doChange });
    }

    // console.log("in change name acdata = ", acData);
    let [ data, setData ] = useState({ acData: [{"name":"aaa"}], click: doChange });

    function doChange()  {
        console.log("dochange");
        // return;
        let newName = document.getElementById("changeName2").value;
        if(newName) {
            let id = document.getElementById("can2").value;
            let index = document.getElementById("can2").selectedIndex;
            console.log(newName, id, index);
            // acData.name = newName;
            // localStorage.setItem('ac', JSON.stringify(acData));
            let a = data.acData;
            console.log(a);
            // a[id].name = "kjhdgkhdfkg";
            setData({ acData: [{"name":"ggg"}], click: doChange })

            // fetch('/account/update/{id}/{newName}');
        }
    }
    console.log("hhhh");
    useEffect(() => {
        bob();
    }, []);

    return children(data);

}







function useAsyncHook(searchBook) {
    const [result, setResult] = React.useState([]);
    const [loading, setLoading] = React.useState("false");
  
    React.useEffect(() => {
      async function fetchBookList() {
        try {
          setLoading("true");
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchBook}`
          );
  
          const json = await response.json();
          // console.log(json);
          setResult(
            json.items.map(item => {
              console.log(item.volumeInfo.title);
              return item.volumeInfo.title;
            })
          );
        } catch (error) {
          setLoading("null");
        }
      }
  
      if (searchBook !== "") {
        fetchBookList();
      }
    }, [searchBook]);
  
    return [result, loading];
  }
  



export function ChangeAccountName2() {
    return (    
        <ChangeName>
            {data => (
                <div className="card">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend col-3">
                            <div className="input-group-text col-12" id="btnGroupAddon">Change Name</div>
                        </div>
                            <MySelect id="can2" list={data.acData} />
                            <button type="button" onClick={data.click}>Change2</button>
                            <input type="text" id="changeName2" className="form-control col-2" placeholder="change name" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                    </div>
                </div>
                )
            }
        </ChangeName>
    )
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

export function ShowDeleteAccount() {

    const [data] = getAc();
    console.log("accounts in ShowDelete ", data);

    function delAccount() {
        let ac_id = $('#sda').val();
        fetch(`/account/remove/${ac_id}`)
            .then(response => response.text())
            .then(response => {
                console.log(response);
                data[0].name = "fishcake";
            })
    }

    return (
        <div className="card">
        <div className="input-group mb-3">
            <div className="input-group-prepend col-3">
                <div className="input-group-text col-12" id="fefe">Delete Account</div>
            </div>
                <MySelect id="sda" list={data} />
                <button type="button" onClick={delAccount}>Delete</button>
        </div>
    </div>
    )
}