import React, { Component } from "react";
import {formatTime} from "../../helpers";

class SpeedQty extends Component {

    constructor() {
        super()
    }

    render() {
        let speed = this.props.speedData;
        // console.table(speed);
        return (
            <div className="card">
                <h2>{speed.type}</h2>
                <table className="table table-sm">
                    <thead>
                        <tr><th>Minutes</th><th>Qty</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                        {this.props.speedTimes.map((time, index) => {
                            return (
                                <tr key={index} className="">
                                    <td style={{width:30+'%'}}>{formatTime(time * 60)}</td>
                                    <td style={{width:30+'%'}}><input className="col-11 px-2" type="number" value={speed[time]} onChange={(e)=>(this.props.onChangeQty(e, speed.type, time))}></input></td>
                                    <td style={{width:40+'%'}}>{formatTime(time * speed[time] * 60)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th><th></th><th>{formatTime(speed.total * 60)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default SpeedQty;
