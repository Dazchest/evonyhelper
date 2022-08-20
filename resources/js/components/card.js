import React, {Component} from "react";
import ReactDOM from "react-dom";

import CardChild from "./cardChild.js";
import CardQuantity from "./cardQuantity";

class Card extends Component {

    constructor() {
        super();

        this.state = {bob: 'cat'};
        
        this.c = 22;

        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);

    }

    handleClick(e) {
        // alert(this.c);
        this.setState({bob: "carrot"});
    }

    handlePress(e) {
        document.getElementById("fish").innerHTML = e.target.value;
        this.setState({bob: e.target.value});

    }

    render() {
        return (
            <div>
                hello world {this.state.bob}
                <CardChild f="hi there" />

                <input value="click me" type="button" onClick={this.handleClick}/>
                <input type="text" onChange={this.handlePress}/>
                {/* <input type="text"/> */}
                <input value="hello" type="text" readOnly/>
                <p id="fish">fff</p>
                
            </div>
        );
    }
}

export default Card;


if (document.getElementById('cards')) {
    // ReactDOM.render(<Card />, document.getElementById('cards'));
}