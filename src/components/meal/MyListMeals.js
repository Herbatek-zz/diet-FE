import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMyMeals, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import ShowMealList from "../common/ShowMealList";
import NoAuthAlert from "../common/NoAuthAlert";


class MealMyList extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        pageSize: 5
    };

    componentDidMount() {
        this.props.setMenuItem('meal-my-list');

        if (this.state.isLoggedIn)
            this.props.fetchMyMeals(0, this.state.pageSize);
    }

    render() {
        const {list, totalElements, currentPage, isLoading} = this.props.myMeals;

        if (!this.state.isLoggedIn)
            return <NoAuthAlert/>;

        return (
            <div className='content__list'>
                <div className='header'>
                    <h1 className='header__title'><label>Moje posiłki</label></h1>
                </div>
                <div className='list'>
                    <ShowMealList
                        mealsList={list}
                        totalElements={totalElements}
                        currentPage={currentPage}
                        isLoading={isLoading}
                        onChange={page => this.props.fetchMyMeals(page - 1, this.state.pageSize)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({meals}) => {
    return {
        myMeals: meals.myMeals
    }
};

export default connect(mapStateToProps, {fetchMyMeals, setMenuItem})(MealMyList);