import React from "react";
import './item-info-table.css';

export default ({item}) => {
    return (
        <table className='table-info'>
            <thead>
            <tr>
                <th><label>Nazwa</label></th>
                <th><label>Wartość/100g</label></th>
            </tr>
            </thead>
            <tbody>
            <tr className='table-info__row'>
                <td><label>Białko</label></td>
                <td><label>{item.protein}g</label></td>
            </tr>
            <tr className='table-info__row'>
                <td><label>Węglowodany</label></td>
                <td><label>{item.carbohydrate}g</label></td>
            </tr>
            <tr className='table-info__row'>
                <td><label>Tłuszcz</label></td>
                <td><label>{item.fat}g</label></td>
            </tr>
            <tr className='table-info__row'>
                <td><label>Błonnik</label></td>
                <td><label>{item.fibre}g</label></td>
            </tr>
            <tr className='table-info__row'>
                <td><label>Kcal</label></td>
                <td><label>{item.kcal.toFixed(0)}</label></td>
            </tr>
            <tr className='table-info__row'>
                <td><label>WW</label></td>
                <td><label>{item.carbohydrateExchange}</label></td>
            </tr>
            <tr className='table-info__row'>
                <td><label>WBT</label></td>
                <td><label>{item.proteinAndFatEquivalent}</label></td>
            </tr>
            </tbody>
        </table>
    )
}