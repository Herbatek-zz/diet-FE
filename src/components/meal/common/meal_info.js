import React, {Component} from 'react';

class MealInfo extends Component {
    render() {

        const {meal} = this.props;

        return (
            <div>
                <h2>Informacje o posiłku</h2>
                <h4>Białko: {Math.round(meal.protein)}</h4>
                <h4>Węglowodany: {Math.round(meal.carbohydrate)}</h4>
                <h4>Tłuszcz: {Math.round(meal.fat)}</h4>
                <h4>Błonnik: {Math.round(meal.fibre)}</h4>
                <h4>Kcal: {Math.round(meal.kcal)}</h4>
                <h4>WW: {meal.carbohydrateExchange.toFixed(2)}</h4>
                <h4>WBT: {meal.proteinAndFatEquivalent.toFixed(2)}</h4>
            </div>
        )
    }
}

export default MealInfo;