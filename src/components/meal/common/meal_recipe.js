import React, {Component} from 'react';


class MealRecipe extends Component {
    render() {

        const {recipe} = this.props;

        return (
            <div>
                <h2>Recipe</h2>
                <h4 className='recipe'>{recipe}</h4>
            </div>
        )
    }
}

export default MealRecipe;