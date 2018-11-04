import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Progress} from 'antd';

import {fetchCart, setMenuItem, removeProductFromCart, removeMealFromCart} from "../../actions";
import AuthService from "../../helpers/auth_service";
import {NO_LOGGED_MESSAGE} from "../../helpers/messages";
import './show_cart.css';
import {Link} from "react-router-dom";


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

        return (
            <div className='content__show-cart'>
                <div className='show-cart__meals-and-products'>
                    <div className='meal-and-products__meals'>
                        <h2><label>Posiłki</label></h2>
                        {<table className='meal-and-products__meals--table'>
                            <thead>
                            <tr>
                                <th/>
                                <th><label>Nazwa</label></th>
                                <th><label>Waga</label></th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {_.map(this.props.cart.meals, meal => {
                                return (
                                    <tr key={meal.id} className='mealAndProducts__meals--tableRow'>
                                        <td className='cart__td--image'>
                                            <Link to={`/meals/${meal.id}`}>
                                                <img src={meal.imageUrl} className='cart__image' alt={meal.name}/>
                                            </Link>
                                        </td>
                                        <td><Link to={`/meals/${meal.id}`}>{meal.name}</Link></td>
                                        <td><label>{meal.amount + "g"}</label></td>
                                        <td><label className='pointer'
                                                   onClick={() => this.props.removeMealFromCart(meal.id, new Date())}>Usuń</label>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        }
                    </div>
                    < div className='mealAndProducts__products'>
                        <h2><label>Produkty</label></h2>
                        {<table className='mealAndProducts__products--table'>
                            <thead>
                            <tr>
                                <th/>
                                <th><label>Nazwa</label></th>
                                <th><label>Waga</label></th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {_.map(this.props.cart.products, product => {
                                return (
                                    <tr key={product.id} className='mealAndProducts__products--tableRow'>
                                        <td className='cart__td--image'>
                                            <Link to={`/products/${product.id}`}>
                                                <img src={product.imageUrl} className='cart__image' alt={product.name}/>
                                            </Link>
                                        </td>
                                        <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                                        <td><label>{product.amount + "g"}</label></td>
                                        <td><label className='pointer'
                                                   onClick={() => this.props.removeProductFromCart(product.id, new Date())}>Usuń</label>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
                <div className='showCart__allProducts'>
                    <h2><lable>Wszystkie produkty</lable></h2>
                    {<table className='showCart__allProducts--table'>
                        <thead>
                        <tr>
                            <th><label>Nazwa</label></th>
                            <th><label>Waga</label></th>
                        </tr>
                        </thead>
                        <tbody>
                        {_.map(this.props.cart.allProducts, product => {
                            return (
                                <tr key={product.id} className='show-cart__all-products--table-row'>
                                    <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                                    <td><label>{product.amount + "g"}</label></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    }
                </div>
                <div className='show-cart__info'>
                    <div>
                        <label>Kalorie</label>
                        <Progress type="dashboard" percent={100}/>
                    </div>
                    <div>
                        <label>Tłuszcze</label>
                        <Progress type="dashboard" percent={5}/>
                    </div>
                    <div>
                        <label>Białko</label>
                        <Progress type="dashboard" percent={20}/>
                    </div>
                    <div>
                        <label>Węglowodany</label>
                        <Progress type="dashboard" percent={24}/>
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

export default connect(mapStateToProps, {fetchCart, removeMealFromCart, removeProductFromCart, setMenuItem})(Show_cart);