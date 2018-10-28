import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Progress} from 'antd';

import {fetchCart, setMenuItem} from "../../actions";
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
                        <h2>Posiłki</h2>
                        {<table className='meal-and-products__meals--table'>
                            <thead>
                            <tr>
                                <th/>
                                <th>Nazwa</th>
                                <th>Waga</th>
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
                                        <td>{meal.amount + "g"}</td>
                                        <td>usuń</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        }
                    </div>
                    < div className='mealAndProducts__products'>
                        <h2>Produkty</h2>
                        {<table className='mealAndProducts__products--table'>
                            <thead>
                            <tr>
                                <th/>
                                <th>Nazwa</th>
                                <th>Waga</th>
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
                                        <td>{product.amount + "g"}</td>
                                        <td>Usuń</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
                <div className='showCart__allProducts'>
                    <h2>Wszystkie produkty</h2>
                    {<table className='showCart__allProducts--table'>
                        <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Waga</th>
                        </tr>
                        </thead>
                        <tbody>
                        {_.map(this.props.cart.allProducts, product => {
                            return (
                                <tr key={product.id} className='show-cart__all-products--table-row'>
                                    <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                                    <td>{product.amount + "g"}</td>
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
                        <Progress type="dashboard" percent={100} />
                    </div>
                    <div>
                        <label>Tłuszcze</label>
                        <Progress type="dashboard" percent={5} />
                    </div>
                    <div>
                        <label>Białko</label>
                        <Progress type="dashboard" percent={20} />
                    </div>
                    <div>
                        <label>Węglowodany</label>
                        <Progress type="dashboard" percent={24} />
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