import React, { Component} from "react";
import ReactDOM from "react-dom";

class TextField extends Component {

    constructor(props) {
        super(props)
        // console.log(this.props)
        // this.label = this.props.label;
        // this.label2 = "this.props.label";
    }

    render() {
        let label3 = "label3";
        // console.log(this.props.onChange);
        const inputType = this.props.inputType ? this.props.inputType : "text"
        return (
            <div>
                <label className="col-4">{this.props.label}</label>
                <input id={this.props.id} className="col-3" type={inputType} value={this.props.value} onChange={this.props.onChange} />
            </div>
        )
    }
}

export default TextField;