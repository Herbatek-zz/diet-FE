import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spin, Icon} from 'antd';
import {Link} from "react-router-dom";

import {fetchMeal, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import MealDescription from './common_components/meal_description';
import MealRecipe from './common_components/meal_recipe';
import MealInfo from './common_components/meal_info';
import MealProducts from "./common_components/meal_products";
import './meal_show.css';


class MealShow extends Component {
    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchMeal(id);
    }

    render() {
        const {meal} = this.props;
        let editIcon;
        let hearthIcon;

        if (meal && AuthService.isLogged()) {
            const {sub} = AuthService.getDecodedToken();

            hearthIcon = (
                <a href='#'>
                    <span className='head__span'>
                        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" fill="currentColor" style={{fontSize: '30px'}}/>
                        Favourite
                    </span>
                </a>
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
            return (
                <div className='content loading-spin'>
                    <Spin size='large'/>
                </div>
            );


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
                            <MealProducts products={meal.products}/>
                        </div>
                        <div className='rightPanel'>
                            <MealDescription description={meal.description}/>
                            <div className='rightPanel__bottom'>
                                <MealRecipe recipe={meal.recipe}/>
                                <MealInfo meal={meal}/>
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