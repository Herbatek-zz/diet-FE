import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchCart, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import {LOADING_SPIN, NO_LOGGED_MESSAGE} from "../../helpers/messages";
import './show_cart.css';


class Show_cart extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
    };

    componentDidMount() {
        this.props.setMenuItem('cart');

        if (this.state.isLoggedIn)
            this.props.fetchCart(new Date());
    }


    render() {
        if (!this.state.isLoggedIn)
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        if (!this.props.cart)
            return <div className='content'>{LOADING_SPIN}</div>;


        return (
            <div className='content'>
                <div className='content__showCart'>
                    <div className='showCart__mealsAndProducts'>
                        <div className='mealAndProducts__meals'>
                            <h2>Posiłki</h2>
                            {<ul>
                                {_.map(this.props.cart.meals, meal => {
                                    return (
                                        <li key={meal.id}>
                                            {meal.name + ": " + meal.amount + "g"}
                                        </li>
                                    )
                                })}
                            </ul>
                            }
                        </div>
                        < div className='mealAndProducts__products'>
                            <h2>Produkty</h2>
                            {<ul>
                                {_.map(this.props.cart.products, product => {
                                    return (
                                        <li key={product.id}>
                                            {product.name + ": " + product.amount + "g" }
                                        </li>
                                    )
                                })}
                            </ul>
                            }
                        </div>
                    </div>
                    <div className='showCart__allProducts'>
                        <h2>Wszystkie produkty</h2>
                        {<ul>
                            {_.map(this.props.cart.allProducts, product => {
                                return (
                                    <li key={product.id}>
                                        {product.name + ": " + product.amount + "g"}
                                    </li>
                                )
                            })}
                        </ul>
                        }
                    </div>
                    <div className='showCart__info'>
                        Info
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({cart}) => {
    return {
        cart
    }
};

export default connect(mapStateToProps, {fetchCart, setMenuItem})(Show_cart);