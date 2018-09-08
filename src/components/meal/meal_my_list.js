import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Layout, Collapse} from 'antd';

import {fetchMyMeals} from "../../actions";
import Header from "../default/header";
import Footer from '../default/footer';
import AuthService from "../../helpers/auth_service";
import {NO_LOGIN_MESSAGE} from "../../helpers/messages";

class MealMyList extends Component {

    componentDidMount() {
        if (AuthService.isLogged())
            this.props.fetchMyMeals(0);
    }

    renderProducts = () => {
        const {Panel} = Collapse;
        const {content, currentPage, totalElements} = this.props.meals;

        return (
            <div className='content'>
                <Collapse className='collapse'>
                    {
                        _.map(content, (meal) => {
                            const header = (
                                <div>
                                    <h3>{meal.name}</h3> <Link to={`/meals/${meal.id}`}> More</Link>
                                </div>
                            );

                            return (
                                <Panel className='collapse__item' key={meal.id} header={header}>
                                    <p>Description: {meal.description}</p>
                                    <p>Calories: {meal.kcal}</p>
                                    <img src={meal.imageUrl} alt='a meal'/>
                                </Panel>
                            )
                        })
                    }
                </Collapse>,
                <Pagination current={currentPage + 1} total={totalElements} onChange={this.onChange}/>
            </div>
        )
    };

    onChange = (page) => {
        this.props.fetchMyMeals(page - 1);
    };

    render() {
        return (
            <Layout>
                <Header menuSelectedItem='meal-my-list'/>
                {AuthService.isLogged() ? this.renderProducts() : NO_LOGIN_MESSAGE}
                <Footer/>
            </Layout>
        );
    }
}

const mapStateToProps = ({meals}) => {
    return {
        meals
    }
};

export default connect(mapStateToProps, {fetchMyMeals})(MealMyList);