import React from "react";

export const TroopQuantity = (props) => {

        let troopQty = props.troopQty[props.currentTroopType];

        return (
            <tbody>
                {props.troopInfo[props.currentTroopType].map((troop, index) => {
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
                            <td className="small"><input className="col-12" type="number" value={troopQty[index]} onChange={(e) => props.onTroopQtyChange(e, index)}></input></td>
                        </tr>
                    )
                })
                }

            </tbody>
        );
}