import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Link } from 'react-router-dom';

import CardQuantity from "./cardQuantity";
import ComposeQuantity from "./composeQuantity";

var cards = [
    {   abb: "g",
        color: "Green",
        qty: 20,
        qty_used: 0,
        qty_left: 0
    },
    {   abb: "b",
        color: "Blue",
        qty: 30,
        qty_used: 0,
        qty_left: 0
    },
    {   abb: "p",
        color: "Purple",
        qty: 20,
        qty_used: 0,
        qty_left: 0
    },
    {   abb: "o",
        color: "Orange",
        qty: 40,
        qty_used: 0,
        qty_left: 0
    },
    {   abb: "r",
        color: "Red",
        qty: 10,
        qty_used: 0,
        qty_left: 0
    },
]


var card_conbinations = [
     "gbp", 
     "gbo", 
     "gbr", 
     "gop", 
     "grp", 
     "rbp", 
     "obp", 
     "gro", 
     "bro", 
     "pro",
    ]

const About = () => {
  return (
  	<h1>About</h1>
  );
}

const Services = () => {
  return (
  	<h1>Services</h1>
  );
}


const Troops = () => {
    return (<div>troopsvvvsss</div>);
}

class CardComposer extends React.Component {

    constructor() {
        super()
  	    this.nameInput = React.createRef();

        this.handleCardQuantityChange = this.handleCardQuantityChange.bind(this);
        this.handleComposeQuantityChange = this.handleComposeQuantityChange.bind(this);

        this.maxCompose = []
        this.composeQtyList = []
        this.state = {cardList: cards, composeQtyList: this.composeQtyList, maxCompose: this.maxCompose};

        for(let x=0; x<10; x++) {
            this.maxCompose[x] = x+2;
            this.composeQtyList[x] = 0;
        }

        this.cardList = this.state.cardList.map((card) => {
            return <CardQuantity 
                key = {card.abb}
                card = {card}
                onCardQtyChange = {this.handleCardQuantityChange}
                // onChange = {this.onChangeCardQuantity}
                />
            }
        );
        this.calc_max();

    }
    componentDidMount() {
        this.nameInput.current.focus();
        this.nameInput.current.placeholder = "ggg";
    }

    handleCardQuantityChange(e, i) {
        let newState = Object.assign({}, this.state);
        newState.cardList[i].qty = e.target.value;
        this.setState(newState);

        this.calc_max();
    }

    handleComposeQuantityChange(e, i) {
        let newState = Object.assign({}, this.state);
        newState.composeQtyList[i] = e.target.value;
        this.setState(newState);
        this.maxCompose[3] = 758

        this.calc_max();
    }

    calc_max() {
        let card_qty_form_cards = this.state.cardList;
        let compose_qty_list = this.state.composeQtyList;
        // console.log(card_qty_form_cards)

        let index = card_qty_form_cards.map(function(e) { return e.abb; }).indexOf('g');
        console.log(index)

        // Reset qty used
        for(let x=0; x<5; x++) {
            card_qty_form_cards[x].qty_used = 0;
        }

        // Grab how many we've used and cal new qty_left
        for(let x=0; x<compose_qty_list.length; x++) {
            let comb = card_conbinations[x];

            for(let y=0; y<3; y++) {
                let c = comb[y];
                let index = card_qty_form_cards.map(function(e) { return e.abb; }).indexOf(c);
                card_qty_form_cards[index].qty_used += Number(compose_qty_list[x]);
                card_qty_form_cards[index].qty_left = card_qty_form_cards[index].qty - cards[index].qty_used;
            }
        }

        // Calc max
        for(let x=0; x<10; x++) {
            let card_qty_form_cards = this.state.cardList;
            let compose_qty_list = this.state.composeQtyList;
            let maxCompose = this.state.maxCompose;
            let max_color = 9999999;
            let comb = card_conbinations[x];

            for(let y=0; y<3; y++) {
                let c = comb[y];
                let index = card_qty_form_cards.map(function(e) { return e.abb; }).indexOf(c);
                if(card_qty_form_cards[index].qty_left < max_color) {
                    max_color = card_qty_form_cards[index].qty_left
                }
            }
            maxCompose[x] = max_color;
            // if(compose_qty_list[x] > maxCompose[x])
            // compose_qty_list[x] = maxCompose[x]

            // console.log(x , max_color);
        }
    }


    render() {
        return (
            <div>
                {/* {this.cardList} */}
                <input
                    ref={this.nameInput}
                    placeholder="Name"
                />
                <br/><br/><br/>

                {this.state.cardList.map((card, index) => (
                    <CardQuantity 
                        key = {index}
                        card = {card}
                        i = {index}
                        onCardQtyChange = {this.handleCardQuantityChange}
                    />
                ))
                }

                <br/><br/><br/>

                {card_conbinations.map((combo, index) => (
                    <ComposeQuantity 
                        key = {index}
                        i = {index}
                        combo = {combo}
                        val = {this.state.composeQtyList[index]}
                        max = {this.state.maxCompose[index]}
                        onComposeQtyChange = {this.handleComposeQuantityChange}
                    />
                ))
                }
                <Link to="/about">About</Link>
                <Link to="/troops">Troops</Link>
            </div>
        )
    }
}

export default CardComposer;


// if (document.getElementById('root')) {
//     // ReactDOM.render(
//     //     <CardComposer />, document.getElementById('root')
//     // );

//     ReactDOM.render(
//   <HashRouter>
//   	<div>
// 	    <Route exact path="/" component={CardComposer}/>
// 	    <Route path="/troops" component={Troops}/> 
// 	    <Route path="/about" component={About}/> 
// 	    <Route path="/services" component={Services}/> 
//     </div>
//   </HashRouter>
// 	, document.getElementById('root'));
// }



