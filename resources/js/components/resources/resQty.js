import React from "react"

import { formatTotal } from "../../helpers";

export function ResQty(props) {

        let res = props.data;
        let d = new Date();
        let date = new Date(res.updated).toLocaleDateString();
        let time = new Date(res.updated).toLocaleTimeString();

        return (
            <div className="container">
                <h2>{res.type}</h2> - <h4>last updated {date} - {time}</h4>
                <button type="button" onClick={(e) => (props.handleReset(e, res.type))}>reset {res.type}</button>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th style={{width:'30%'}}>Value</th>
                        <th style={{width:'30%'}}>Qty</th>
                        <th style={{width:'30%'}}>Total</th>
                        </tr>
                    </thead>
                    <tbody>

                    {props.resSizes.map((s, index) => {
                        return (
                            <tr key={index}>
                                <td>{s}</td>
                                <td><input min="0" className="col-12 px-2" type="number" value={res[s]} onChange={(e) => (props.handleQtyChange(e, res.type, s))} /></td>
                                <td>{formatTotal(res[s] * s)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    <tfoot>
                        <tr className="table-info">
                            <td></td>
                            <td></td>
                            <td>{formatTotal(res.total).toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
}

