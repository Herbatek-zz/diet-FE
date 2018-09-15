import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spin} from 'antd';

import {fetchMeal, setMenuItem} from "../../actions";


class MealShow extends Component {
    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchMeal(id);
    }

    render() {
        const {meal} = this.props;

        if (!meal)
            return (
                <div className='content loading-spin'>
                    <Spin size='large'/>
                </div>
            );


        return (
            <div className='content'>
                <h4>Name: {meal.name}</h4>
                <h5>Description: {meal.description}</h5>
                <h5>Recipe: {meal.recipe}</h5>
                <img src={meal.imageUrl} alt='meal'/>
                <h5>Protein: {meal.protein}</h5>
                <h5>Carbohydrate: {meal.carbohydrate}</h5>
                <h5>Fat: {meal.fat}</h5>
                <h5>Fibre: {meal.fibre}</h5>
                <h5>Kcal: {meal.kcal}</h5>
                <h5>CE: {meal.carbohydrateExchange}</h5>
                <h5>PAFE: {meal.proteinAndFatEquivalent}</h5>
            </div>
        );
    }
}

const mapStateToProps = ({meals}, ownProps) => {
    return {
        meal: meals.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchMeal, setMenuItem})(MealShow);