import React, {Component} from 'react';

class MealInfo extends Component {
    render() {

        const {meal} = this.props;

        return (
            <div>
                <h2>Meal info</h2>
                <h4>Protein: {meal.protein}</h4>
                <h4>Carbohydrate: {meal.carbohydrate}</h4>
                <h4>Fat: {meal.fat}</h4>
                <h4>Fibre: {meal.fibre}</h4>
                <h4>Kcal: {meal.kcal}</h4>
                <h4>CE: {meal.carbohydrateExchange}</h4>
                <h4>PAFE: {meal.proteinAndFatEquivalent}</h4>
            </div>
        )
    }
}

export default MealInfo;