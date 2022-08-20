import React, { Component} from "react";


class ComposeQuantity extends Component {

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        // console.log("handling a change " + this.props.max)
        this.props.onComposeQtyChange(e, this.props.i);
    }

    render() {
        return (
            <div>
                <label className="col-4" >Card {this.props.i+1} - {this.props.combo} - Max left = {this.props.max} </label>
                <input className="col-3" type="number" value={this.props.val} min="0" max={this.props.max + this.props.val} onChange={this.handleChange}/>
            </div>
        )
    }
}


export default ComposeQuantity;