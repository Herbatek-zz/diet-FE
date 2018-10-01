import React, {Component} from 'react';
import styled from "styled-components";

const Recipe = styled.div `
    width: 50%;
    border: 1px solid rgba(87, 87, 87, 0.2);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 10px;
    margin-right: 10px;
`;

class MealRecipe extends Component {
    render() {

        const {recipe} = this.props;

        return (
            <Recipe>
                <h2>Recipe</h2>
                <h4 className='recipe'>{recipe}</h4>
            </Recipe>
        )
    }
}

export default MealRecipe;