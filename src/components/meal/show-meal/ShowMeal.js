import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMeal, setMenuItem} from "../../../actions";
import AuthService from "../../../helpers/auth_service";
import {LOADING_SPIN} from './../../../helpers/messages';
import ItemInfoTable from './../../common/item-info-table';
import {message} from "antd";
import MealMenu from "./MealMenu";
import './ShowMeal.css';
import MealProducts from "./MealProducts";


class MealShow extends Component {
    state = {
        isLogged: AuthService.isLogged(),
        mealId: this.props.match.params.id,
        isActual: true
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchMeal(this.state.mealId, () => {
            if (this.props.location.state)
                this.setState({isActual: false});
            else
                message.error("Nie odnaleziono produktu")
        });
    }

    onDelete = () => {
        this.props.history.push('/meals/my');
    };

    render() {
        const {meal} = this.state.isActual ? this.props : this.props.location.state;
        const {isLogged, isActual} = this.state;

        if (!meal)
            return LOADING_SPIN;

        return (
            <div className='meal-show'>
                <div className='meal-show__head'>
                    <h1 className='meal-show__title'>
                        <label>{meal.name}</label>
                    </h1>
                    {isLogged && isActual ? <MealMenu mealId={meal.id} userId={meal.userId} onDelete={this.onDelete}/> : null}
                </div>
                <div className='meal-show__body'>
                    <div className='meal-show__first-panel'>
                        <div className='first-panel__image-container'>
                            <img className='first-panel__image' src={meal.imageUrl} alt={meal.name}/>
                        </div>
                        <div className='first-panel__info'>
                            <h2>Informacje o posiłku</h2>
                            <ItemInfoTable item={meal}/>
                        </div>
                    </div>
                    <div className='meal-show__second-panel'>
                        <div className='second-panel__meal-products'>
                            <MealProducts products={meal.products}/>
                        </div>
                        <div className='second-panel__description'>
                            <h2>Opis</h2>
                            <p className='second-panel__description-text'>
                                {meal.description}
                            </p>
                        </div>
                        <div className='second-panel__recipe'>
                            <h2>Przepis</h2>
                            <p className='second-panel__recipe-text'>
                                {meal.recipe}
                            </p>
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