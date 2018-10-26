import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMeal, setMenuItem, addMealToCart, deleteMeal} from "../../actions";
import AuthService from "../../helpers/auth_service";
import MealInfo from './common/meal_info';
import ShowMealProducts from "./common/show_meal_products";
import './css/meal_show.css';
import {LOADING_SPIN} from "../../helpers/messages";
import HearthIcon from '../common/icons/hearthIcon';
import AddToCartIcon from '../common/icons/addToCartIcon';
import EditIcon from '../common/icons/editIcon';
import DeleteIcon from '../common/icons/deleteIcon';
import {InputNumber, Modal} from "antd";


class MealShow extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        mealId: this.props.match.params.id,
        modalVisible: false,
        amount: 0
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchMeal(this.state.mealId);
    }

    render() {
        const {meal} = this.props;
        const {mealId, isLoggedIn, amount} = this.state;

        if (!meal)
            return LOADING_SPIN;

        return (
            <div className='content__mealShow'>
                <div className='head'>
                    <h1 className='head__title'>{meal.name}</h1>
                    {isLoggedIn ?
                        <div className='head__menu'>
                            <HearthIcon mealId={mealId}/>
                            <AddToCartIcon onClick={() => this.setState({modalVisible: true})}/>
                            {meal.userId === AuthService.getDecodedToken().sub ? <EditIcon link={`/meals/${mealId}/edit`}/> : ''}
                            {meal.userId === AuthService.getDecodedToken().sub ?
                                <DeleteIcon confirmText='Czy na pewno chcesz usunąć ten posiłek ?'
                                            onDelete={() => deleteMeal(this.state.mealId, () => this.props.history.push('/meals/my'))}/> : ''}
                        </div> : ''}

                    <Modal
                        title="Wpisz ilość posiłku [g]"
                        visible={this.state.modalVisible}
                        onOk={() => {
                            this.props.addMealToCart(mealId, new Date(), amount);
                            this.setState({modalVisible: false})
                        }}
                        onCancel={() => this.setState({modalVisible: false})}
                    >
                        <InputNumber min={0} value={this.state.amount} onChange={(value) => {
                            this.setState({amount: value})
                        }}/>

                    </Modal>
                </div>
                <div className='body'>
                    <div className='firstPanel'>
                        <div className='firstPanel__imageContainer'>
                            <img src={meal.imageUrl} alt={meal.name} className='firstPanel__imageContainer--image'/>
                        </div>
                        <div className='show__mealProducts'>
                            <ShowMealProducts products={meal.products}/>
                        </div>
                    </div>
                    <div className='secondPanel'>
                        <div className='show__mealDescription'>
                            <h2>Opis</h2>
                            <h4 className='description'>{meal.description}</h4>
                        </div>
                        <div className='secondPanel__bottom'>
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
        );
    }
}

const mapStateToProps = ({meals}, ownProps) => {
    return {
        meal: meals.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchMeal, setMenuItem, addMealToCart, deleteMeal})(MealShow);