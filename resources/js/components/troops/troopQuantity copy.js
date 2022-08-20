import React, { Component  } from "react";

class TroopQuantity extends Component {

    constructor() {
        super();

    }

    render() {

        let troopQty = this.props.troopQty[this.props.currentTroopType];

        return (
            <tbody>
            
                {this.props.troopInfo[this.props.currentTroopType].map((troop, index) => {
                    return( 
                        <tr key={index}>
                            <td className="small">{troop.tier}</td>
                            <td className="small">{troop.food}</td>
                            <td className="small">{troop.wood}</td>
                            <td className="small">{troop.stone}</td>
                            <td className="small">{troop.iron}</td>
                            <td className="small d-none d-lg-table-cell">{troop.gold}</td>
                            <td className="small d-none d-lg-table-cell">{troop.time.toFixed(0)}</td>
                            <td className="small d-none d-lg-table-cell">{troop.power}</td>
                            <td className="small"><input className="col-12" type="number" value={troopQty[index]} onChange={(e) => this.props.onTroopQtyChange(e, index)}></input></td>
                        </tr>
                    )
                })
                }

            </tbody>
        );
    }
}

export default TroopQuantity;