import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Layout, Collapse} from 'antd';

import {fetchMyMeals} from "../../actions";
import Header from "../default/header";
import Footer from '../default/footer';
import '../product/product_list.css';

class MealMyList extends Component {
    componentDidMount() {
        this.props.fetchMyMeals(0);
    }

    renderProducts = () => {
        const {Panel} = Collapse;
        const {content} = this.props.meals;


        return _.map(content, (meal) => {
            return (
                <Panel
                    className='collapse__item'
                    key={meal.id}
                    header={
                        <div>
                            <h3>{meal.name}</h3> <Link to={`/meals/${meal.id}`}> More</Link>
                        </div>}>
                    <p>Description: {meal.description}</p>
                    <p>Calories: {meal.kcal}</p>
                    <img src={meal.imageUrl} alt='meal'/>
                </Panel>

            );
        });
    };

    onChange = (page) => {
        this.props.fetchMyMeals(page - 1);
    };

    render() {
        const {currentPage, totalElements} = this.props.meals;

        return (
            <Layout>
                <Header navSelectedItem='product-my-list'/>

                <div className='content'>
                    <Collapse className='collapse'>
                        {this.renderProducts()}
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

export default connect(mapStateToProps, {fetchMyMeals})(MealMyList);