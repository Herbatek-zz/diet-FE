import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchFavouriteMeals, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import ShowMealList from "../common/show_meal_list";
import NoAuthAlert from "../common/NoAuthAlert";


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
        const {meals} = this.props;
        if (!this.state.isLoggedIn)
            return <NoAuthAlert/>;

        return (
            <div className='content__list'>
                <div className='header'>
                    <h1 className='header__title'><label>Ulubione posiłki</label></h1>
                </div>
                <div className='list'>
                    <ShowMealList meals={meals} onChange={page => this.props.fetchFavouriteMeals(page - 1, this.state.pageSize)}/>
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

export default connect(mapStateToProps, {fetchFavouriteMeals, setMenuItem})(MealFavourite);