import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, Tooltip, Popconfirm} from 'antd';
import {Link} from "react-router-dom";

import {
    fetchMeal,
    setMenuItem,
    isFavouriteMeal,
    addMealToFavourites,
    removeMealFromFavourites,
    deleteMeal,
    addMealToCart
} from "../../actions";
import AuthService from "../../helpers/auth_service";
import MealInfo from './common/meal_info';
import ShowMealProducts from "./common/show_meal_products";
import './css/meal_show.css';
import {LOADING_SPIN} from "../../helpers/messages";


class MealShow extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        mealId: this.props.match.params.id,
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchMeal(this.state.mealId);
        if (this.state.isLoggedIn)
            this.props.isFavouriteMeal(this.state.mealId);

    }


    render() {
        const {meal} = this.props;
        let editIcon;
        let hearthIcon;
        let deleteIcon;
        let addToCartIcon;

        if (meal && this.state.isLoggedIn) {
            const {sub} = AuthService.getDecodedToken();

            hearthIcon = (() => {
                if (this.props.isFavourite) {
                    return <Tooltip placement="top" title='Remove from favourites' arrowPointAtCenter='true'>
                <span className='head__span'
                      onClick={() => this.props.removeMealFromFavourites(this.state.mealId)}>
                        <Icon type="heart" theme="filled" twoToneColor="#eb2f96" style={{fontSize: '30px', color: '#eb2f96'}}/>
                        Ulubione
                </span>
                    </Tooltip>;
                } else {
                    return <Tooltip placement="top" title='Add to favourites' arrowPointAtCenter='true'>
                <span className='head__span'
                      onClick={() => this.props.addMealToFavourites(this.state.mealId)}>
                        <Icon type="heart" theme="outlined" twoToneColor="#eb2f96" style={{fontSize: '30px', color: '#eb2f96'}}/>
                        Ulubione
                </span>
                    </Tooltip>
                }
            })();

            addToCartIcon = (() => {
                return (
                    <span className='head__span' onClick={() => this.props.addMealToCart(this.state.mealId)}>
                        <Icon type="shopping-cart" theme="outlined" style={{fontSize: '30px'}}/>
                        Do koszyka
                    </span>
                );
            })();

            editIcon = (() => {
                if (sub === meal.userId)
                    return (
                        <Link to={`/meals/${meal.id}/edit`}>
                            <span className='head__span'>
                                <Icon type="setting" style={{fontSize: '30px'}}/>
                                Edytuj
                            </span>
                        </Link>
                    );
            })();

            deleteIcon = (() => {
                if (sub === meal.userId)
                    return (
                        <Popconfirm title="Czy na pewno chcesz usunąć ten posiłek ?"
                                    onConfirm={() => deleteMeal(this.state.mealId, () => this.props.history.push('/meals/my'))}
                                    okText="Tak"
                                    cancelText="Nie">
                        <span className='head__span'>
                                <Icon type="delete" theme="outlined" style={{fontSize: '30px'}}/>
                                Usuń
                        </span>
                        </Popconfirm>
                    );
            })();
        }

        if (!meal)
            return LOADING_SPIN;


        return (
            <div className='content'>
                <div className='content__wrap--mealShow'>
                    <div className='head'>
                        <h1 className='head__title'>{meal.name}</h1>
                        <div className='head__menu'>
                            {hearthIcon}
                            {addToCartIcon}
                            {editIcon}
                            {deleteIcon}
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
                                <h2>Opis</h2>
                                <h4 className='description'>{meal.description}</h4>
                            </div>
                            <div className='rightPanel__bottom'>
                                <div className='show__mealRecipe'>
                                    <h2>Przepis</h2>
                                    <h4 className='recipe'>{meal.recipe}</h4>
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
        meal: meals.content[ownProps.match.params.id],
        isFavourite: meals.isFavourite
    }
};

export default connect(mapStateToProps, {
    fetchMeal,
    setMenuItem,
    isFavouriteMeal,
    addMealToFavourites,
    removeMealFromFavourites,
    deleteMeal,
    addMealToCart
})(MealShow);