import React, {Component} from "react";

import TextField from "./textField.js";

class CardQuantity extends Component {

    constructor(props) {
        super(props);

        this.state = this.props.card;
        console.log("state = " + this.state.color);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("trying to change " + e.target.value);
        this.setState({qty: e.target.value});
        // e.target.value = "44"
    }

    render() {
        const card = this.props.card;
        // console.log(card);

        return (
            <div>
                {/* <label className="col-3">{this.props.color}</label>
                <label className="col-3">{this.props.color}</label>
                <input className="col-2" type="text" /> */}
                <TextField
                    label={"Card Color = " + card.color + " - " + this.state.qty}
                    value={this.state.qty}
                    inputType = "number"
                    // onChange = {this.props.onChange}
                    onChange = {this.handleChange}
                />
            </div>
        );
    }
}

export default CardQuantity;