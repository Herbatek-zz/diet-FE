import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMyMeals, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import {LOADING_SPIN, NO_LOGGED_MESSAGE} from "../../helpers/messages";
import ShowMealList from "../common/show_meal_list";


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
        if (!this.state.isLoggedIn)
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='content__wrap--mealList'>
                <div className='header'>
                    <h1>Moje posiłki</h1>
                </div>
                <div className='list'>
                    {Object.keys(this.props.meals.content).length === 0 ? "Nie stworzyłeś jeszcze żadnego posiłku" :
                    <ShowMealList meals={this.props.meals}
                                  onChange={page => this.props.fetchMyMeals(page - 1, this.state.pageSize)}/>}}
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