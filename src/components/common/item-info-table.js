import React from "react";
import './item-info-table.css';

export default ({item}) => {
    return (
        <table className='table-info'>
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Wartość/100g</th>
            </tr>
            </thead>
            <tbody>
            <tr className='table-info__row'>
                <td>Białko</td>
                <td>{Math.floor(item.protein)}g</td>
            </tr>
            <tr className='table-info__row'>
                <td>Węglowodany</td>
                <td>{Math.floor(item.carbohydrate)}g</td>
            </tr>
            <tr className='table-info__row'>
                <td>Tłuszcz</td>
                <td>{Math.floor(item.fat)}g</td>
            </tr>
            <tr className='table-info__row'>
                <td>Błonnik</td>
                <td>{Math.floor(item.fibre)}g</td>
            </tr>
            <tr className='table-info__row'>
                <td>Kcal</td>
                <td>{Math.floor(item.kcal)}</td>
            </tr>
            <tr className='table-info__row'>
                <td>WW</td>
                <td>{item.carbohydrateExchange.toFixed(2)}</td>
            </tr>
            <tr className='table-info__row'>
                <td>WBT</td>
                <td>{item.proteinAndFatEquivalent.toFixed(2)}</td>
            </tr>
            </tbody>
        </table>
    )
}