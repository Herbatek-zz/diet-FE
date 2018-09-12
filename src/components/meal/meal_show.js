import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Spin} from 'antd';

import {fetchMeal} from "../../actions";
import Header from '../default/header';
import Footer from '../default/footer';


class MealShow extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchMeal(id);
    }

    render() {
        const {meal} = this.props;

        if (!meal)
            return (
                <Layout>
                    <Header/>
                    <div className='content loading-spin'>
                        <Spin size='large'/>
                    </div>
                    <Footer/>
                </Layout>);


        return (
            <Layout>
                <Header/>
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
                <Footer/>
            </Layout>
        );
    }
}

const mapStateToProps = ({meals}, ownProps) => {
    return {
        meal: meals.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchMeal})(MealShow);