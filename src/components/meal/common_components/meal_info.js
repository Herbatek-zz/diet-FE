import React, {Component} from 'react';
import styled from "styled-components";

const Info = styled.div `
    border: 1px solid rgba(87, 87, 87, 0.2);
    border-radius: 5px;
    padding: 10px;
    width: 50%;
`;

class MealInfo extends Component {
    render() {

        const {meal} = this.props;

        return (
            <Info>
                <h2>Meal info</h2>
                <h4>Protein: {meal.protein}</h4>
                <h4>Carbohydrate: {meal.carbohydrate}</h4>
                <h4>Fat: {meal.fat}</h4>
                <h4>Fibre: {meal.fibre}</h4>
                <h4>Kcal: {meal.kcal}</h4>
                <h4>CE: {meal.carbohydrateExchange}</h4>
                <h4>PAFE: {meal.proteinAndFatEquivalent}</h4>
            </Info>
        )
    }
}

export default MealInfo;