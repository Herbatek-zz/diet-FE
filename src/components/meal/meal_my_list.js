import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Collapse} from 'antd';

import {fetchMyMeals, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import {NO_LOGIN_MESSAGE} from "../../helpers/messages";


class MealMyList extends Component {
    componentDidMount() {
        this.props.setMenuItem('meal-my-list');

        if (AuthService.isLogged())
            this.props.fetchMyMeals(0);
    }

    renderProducts = () => {
        const {Panel} = Collapse;
        const {content, currentPage, totalElements} = this.props.meals;

        return (
            <div>
                <div className='collapse-list'>
                    <Collapse className='collapse'>
                        {
                            _.map(content, meal => {
                                const header = (
                                    <div>
                                        <h3>{meal.name}</h3>
                                        <Link to={`/meals/${meal.id}`}> More</Link>
                                        <Link to={`/meals/${meal.id}/edit`}> Edit</Link>
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
                    </Collapse>
                </div>
                <div className='pagination'>
                    <Pagination current={currentPage + 1} total={totalElements} onChange={this.onChange}/>
                </div>
            </div>
        )
    };

    onChange = (page) => {
        this.props.fetchMyMeals(page - 1);
    };

    render() {
        return (
            <div className='content'>
                <div className='content__wrap--mealList'>
                    <div className='header'>
                        <h1>My meals</h1>
                    </div>
                    {AuthService.isLogged() ? this.renderProducts() : NO_LOGIN_MESSAGE}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({meals}) => {
    return {
        meals
    }
};

export default connect(mapStateToProps, {fetchMyMeals, setMenuItem})(MealMyList);