import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Layout, Collapse} from 'antd';

import {fetchMeals} from "../../actions";
import Header from "../default/header";
import Footer from '../default/footer';
import '../product/product_list.css';

class MealList extends Component {
    componentDidMount() {
        this.props.fetchMeals(0);
    }

    renderMeals = () => {
        const {content} = this.props.meals;
        const {Panel} = Collapse;

        return _.map(content, (meal) => {
            return (
                <Panel
                    className='collapse__item'
                    key={meal.id}
                    header={
                        <div>
                            <h3>{meal.name}</h3>
                            <Link to={`/meals/${meal.id}`}> More</Link>
                        </div>}>
                    <p>Description: {meal.description}</p>
                    <p>Calories: {meal.kcal}</p>
                    <img src={meal.imageUrl} alt='meal'/>
                </Panel>

            );
        });
    };

    onChange = (page) => {
        this.props.fetchMeals(page - 1);
    };

    render() {
        const {currentPage, totalElements} = this.props.meals;

        return (
            <Layout>
                <Header navSelectedItem='meal-list'/>

                <div className='content'>
                    <Collapse className='collapse'>
                        {this.renderMeals()}
                    </Collapse>,
                    <Pagination current={currentPage + 1} total={totalElements} onChange={this.onChange}/>
                </div>

                <Footer/>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {meals: state.meals};
}

export default connect(mapStateToProps, {fetchMeals})(MealList);