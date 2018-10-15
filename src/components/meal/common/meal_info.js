import React, {Component} from 'react';

class MealInfo extends Component {
    render() {

        const {meal} = this.props;

        return (
            <div>
                <h2>Informacje o produkcie</h2>
                <h4>Białko: {meal.protein}</h4>
                <h4>Węglowodany: {meal.carbohydrate}</h4>
                <h4>Tłuszcz: {meal.fat}</h4>
                <h4>Błonnik: {meal.fibre}</h4>
                <h4>Kcal: {meal.kcal}</h4>
                <h4>WW: {meal.carbohydrateExchange}</h4>
                <h4>WBT: {meal.proteinAndFatEquivalent}</h4>
            </div>
        )
    }
}

export default MealInfo;