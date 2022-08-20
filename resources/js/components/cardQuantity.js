import React, {Component} from "react";

import TextField from "./textField.js";

class CardQuantity extends Component {

    constructor(props) {
        super(props);

        // this.state = this.props.card;
        // console.log("state = " + this.state.color);
        // console.log(this.props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // console.log(this.props.card);
        // this.setState({qty: e.target.value});
        // e.target.value = "44"
        this.props.onCardQtyChange(e, this.props.i);
        // this.props.onCardQtyChange(e.target.value);
    }

    render() {
        const card = this.props.card;
        // console.log(card);

        return (
            <div>
                {/* <TextField
                    label={"Card Color = " + card.color + " - " + card.qty}
                    // id={card.abb}
                    value={card.qty}
                    inputType = "number"
                    // onChange = {this.props.onChange}
                    onChange = {this.handleChange}
                /> */}

                <label className="col-4">{"Card Color = " + card.color + " - " + card.qty}</label>
                <input className="col-3" type="number" value={card.qty} onChange={this.handleChange} />
                <label className="col-2">{card.qty_used}</label>
                <label className="col-2">{card.qty_left}</label>
            </div>
        );
    }
}

export default CardQuantity;