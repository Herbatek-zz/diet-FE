import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import {Link} from "react-router-dom";

import {fetchMeal, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import MealDescription from './common/meal_description';
import MealRecipe from './common/meal_recipe';
import MealInfo from './common/meal_info';
import ShowMealProducts from "./common/show_meal_products";
import './css/meal_show.css';
import {SHOW_LOADING_SPIN} from "../../helpers/messages";
import SecuredRequest from '../../helpers/secured_request';


class MealShow extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        mealId: this.props.match.params.id
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchMeal(this.state.mealId);
    }

    render() {
        const {meal} = this.props;
        let editIcon;
        let hearthIcon;

        if (meal && this.state.isLoggedIn) {
            const {sub} = AuthService.getDecodedToken();

            hearthIcon = (
                <span className='head__span' onClick={() => SecuredRequest.post(`/users/${sub}/favourite/meals/${this.state.mealId}`, {})}>
                        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" fill="currentColor" style={{fontSize: '30px'}}/>
                        Favourite
                </span>
            );

            editIcon = (() => {
                if (sub === meal.userId)
                    return (
                        <Link to={`/meals/${meal.id}/edit`}>
                            <span className='head__span'>
                                <Icon type="setting" style={{fontSize: '30px'}}/>
                                Edit
                            </span>
                        </Link>
                    );
            })();
        }

        if (!meal)
            return SHOW_LOADING_SPIN;


        return (
            <div className='content'>
                <div className='content__wrap--mealShow'>
                    <div className='head'>
                        <h1 className='head__title'>{meal.name}</h1>
                        <div className='head__menu'>
                            {hearthIcon}
                            {editIcon}
                        </div>
                    </div>
                    <div className='body'>
                        <div className='leftPanel'>
                            <div className='leftPanel__imageContainer'>
                                <img src={meal.imageUrl} alt={meal.name} className='leftPanel__imageContainer--image'/>
                            </div>
                            <div className='show__mealProducts'>
                                <ShowMealProducts products={meal.products}/>
                            </div>
                        </div>
                        <div className='rightPanel'>
                            <div className='show__mealDescription'>
                                <MealDescription description={meal.description}/>
                            </div>
                            <div className='rightPanel__bottom'>
                                <div className='show__mealRecipe'>
                                    <MealRecipe recipe={meal.recipe}/>
                                </div>
                                <div className='show__mealInfo'>
                                    <MealInfo meal={meal}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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