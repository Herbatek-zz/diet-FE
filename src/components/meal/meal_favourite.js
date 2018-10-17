import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchFavouriteMeals, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import {NO_LOGGED_MESSAGE} from "../../helpers/messages";
import ShowMealList from "../common/show_meal_list";


class MealFavourite extends Component {
    state = {
        pageSize: 5,
        isLoggedIn: AuthService.isLogged()
    };

    componentDidMount() {
        this.props.setMenuItem('meal-favourite');
        if (this.state.isLoggedIn)
            this.props.fetchFavouriteMeals(0, this.state.pageSize);
    }

    render() {
        if (!this.state.isLoggedIn)
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='content'>
                <div className='content__wrap--productList'>
                    <h1>Ulubione posiłki</h1>
                    <div className='products__list'>
                        {Object.keys(this.props.meals.content).length === 0 ? "No data to display" :
                            <ShowMealList meals={this.props.meals} onChange={this.onChange}/>}
                    </div>
                </div>
            </div>
        );
    }

    onChange = page => this.props.fetchFavouriteMeals(page - 1, this.state.pageSize);
}

const mapStateToProps = ({meals}) => {
    return {
        meals
    }
};

export default connect(mapStateToProps, {fetchFavouriteMeals, setMenuItem})(MealFavourite);