
var card_abb = ["g", "b", "p", "o", "r"];

var cards = {
    "g": {
        color: "green",
        qty: 0,
        qty_used: 0,
        qty_left: 0
    },
    "b": {
        color: "blue",
        qty: 0,
        qty_used: 0,
        qty_left: 0
    },
    "p": {
        color: "purple",
        qty: 0,
        qty_used: 0,
        qty_left: 0
    },
    "o": {
        color: "orange",
        qty: 0,
        qty_used: 0,
        qty_left: 0
    },
    "r": {
        color: "red",
        qty: 0,
        qty_used: 0,
        qty_left: 0
    },

}

// var card_conbinations = {
//     one: "rgb", 
//     two: "rgo", 
//     three: "rgp", 
//     four: "rbo", 
//     five: "rbp", 
//     six: "rop", 
//     seven: "gbo", 
//     eight: "gbp", 
//     nine: "gop", 
//     ten: "bop",
//     }
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


console.log(card_conbinations);

window.onload = init;

function init() {
    document.getElementById("compose_qty_form").addEventListener("change", function(e) {
        update_max(e);
    })
    calc_max();
}

function calc_max() {
    let card_qty_form_cards = document.getElementById("card_qty_form").elements;
    let compose_qty_list = document.getElementById("compose_qty_form").elements;

    // Grab how many cards of each color we have
    for(let x=0; x<card_qty_form_cards.length; x++) {
        let c = card_abb[x];
        cards[c].qty = Number(card_qty_form_cards[x].value);
        cards[c].qty_used = 0;  // reset used qty
    }

    // Grab how many we've used and cal new qty_left
    for(let x=0; x<compose_qty_list.length; x++) {
        let comb = card_conbinations[x];

        for(let y=0; y<3; y++) {
            let c = comb[y];
            cards[c].qty_used += Number(compose_qty_list[x].value);
            cards[c].qty_left = cards[c].qty - cards[c].qty_used;
        }
    }

    // Calc max
    for(let x=0; x<10; x++) {
        let max_color = 9999999;
        let comb = card_conbinations[x];

        for(let y=0; y<3; y++) {
            let c = comb[y];
            if(cards[c].qty_left < max_color) {
                max_color = cards[c].qty_left
            }
        }

        compose_qty_list[x].previousElementSibling.textContent = card_conbinations[x] +  " - max = " + max_color;
        console.log(x , max_color);
    }


    console.table(cards);
}

function update_max(t) {
    console.log(t);
    // console.log(t.target.previousElementSibling..textContent = "max = 33");
    // t.target.previousElementSibling.textContent = "max = 33";
    calc_max();
}