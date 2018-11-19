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
            return <div className='content__show-cart'>{NO_LOGGED_MESSAGE}</div>;

        const {cart} = this.props;

        return (
            <div className='content__show-cart'>
                <div className='show-cart__first-section'>
                    <div className='first-section__meals'>
                        <h2><label>Posiłki</label></h2>
                        {<table className='first-section__meals--table'>
                            <thead>
                            <tr>
                                <th/>
                                <th><label>Nazwa</label></th>
                                <th><label>Waga</label></th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {_.map(cart.meals, meal => {
                                return (
                                    <tr key={meal.id} className='first-section__meals--tableRow'>
                                        <td className='cart__td--image'>
                                            <Link to={`/meals/${meal.id}`}>
                                                <img src={meal.imageUrl} className='cart__image' alt={meal.name}/>
                                            </Link>
                                        </td>
                                        <td><Link to={`/meals/${meal.id}`}>{meal.name}</Link></td>
                                        <td><label>{meal.amount + "g"}</label></td>
                                        <td><label className='pointer label-delete'
                                                   onClick={() => this.props.removeMealFromCart(meal.id, new Date())}>Usuń</label>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        }
                    </div>
                    < div className='first-section__products'>
                        <h2><label>Produkty</label></h2>
                        {<table className='first-section__products--table'>
                            <thead>
                            <tr>
                                <th/>
                                <th><label>Nazwa</label></th>
                                <th><label>Waga</label></th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {_.map(cart.products, product => {
                                return (
                                    <tr key={product.id} className='first-section__products--tableRow'>
                                        <td className='cart__td--image'>
                                            <Link to={`/products/${product.id}`}>
                                                <img src={product.imageUrl} className='cart__image' alt={product.name}/>
                                            </Link>
                                        </td>
                                        <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                                        <td><label>{product.amount + "g"}</label></td>
                                        <td><label className='pointer label-delete'
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
                <div className='showCart__second-section'>
                    <div className='second-section__content'>
                        <h2>
                            <label>Potrzebne produkty</label>
                        </h2>
                        {<table className='showCart__second-section--table'>
                            <thead>
                            <tr>
                                <th><label>Nazwa</label></th>
                                <th><label>Waga</label></th>
                            </tr>
                            </thead>
                            <tbody>
                            {_.map(cart.allProducts, product => {
                                return (
                                    <tr key={product.id} className='show-cart__second-section--table-row'>
                                        <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                                        <td><label>{product.amount + "g"}</label></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
                <div className='show-cart__third-section'>
                    {cart.targetUserCalories ?
                        <div className='show-cart__progress-items'>
                            <div className='show-cart__progress-items--calories'>
                                <div className='show-cart__progress'>
                                    <label className='show-cart__progress--tittle'><b>Kalorie</b></label>
                                    <Progress type="dashboard"
                                              width={150}
                                              percent={cart.kcal === undefined || cart.kcal === 0 ? 0 : Number(((cart.kcal / cart.targetUserCalories) * 100).toFixed(1))}
                                              status={cart.kcal > cart.targetUserCalories ? "exception" : cart.kcal === cart.targetUserCalories ? "success" : "active"}/>
                                    <label>{cart.kcal} kcal / {cart.targetUserCalories} kcal</label>
                                </div>
                            </div>
                            <div className='show-cart__progress-items--macro'>
                                <div className='show-cart__progress'>
                                    <label className='show-cart__progress--tittle'><b>Tłuszcze</b></label>
                                    <Progress type="circle"
                                              width={80}
                                              status={cart.fat > cart.targetUserFat ? "exception" : cart.fat === cart.targetUserFat ? "success" : "active"}
                                              percent={cart.fat === undefined || cart.fat === 0 ? 0 : Number(((cart.fat / cart.targetUserFat) * 100).toFixed(1))}/>
                                    <label> {cart.fat} g / {cart.targetUserFat} g</label>
                                </div>
                                <div className='show-cart__progress'>
                                    <label className='show-cart__progress--tittle'><b>Białko</b></label>
                                    <Progress type="circle"
                                              width={80}
                                              status={cart.protein > cart.targetUserProtein ? "exception" : cart.protein === cart.targetUserProtein ? "success" : "active"}
                                              percent={cart.protein === undefined || cart.protein === 0 ? 0 : Number(((cart.protein / cart.targetUserProtein) * 100).toFixed(1))}/>
                                    <label> {cart.protein} g / {cart.targetUserProtein} g</label>
                                </div>
                                <div className='show-cart__progress'>
                                    <label className='show-cart__progress--tittle'><b>Węglowodany</b></label>
                                    <Progress type="circle"
                                              width={80}
                                              status={cart.carbohydrate > cart.targetUserCarbohydrate ? "exception" : cart.carbohydrate === cart.targetUserCarbohydrate ? "success" : "active"}
                                              percent={cart.carbohydrate === undefined || cart.carbohydrate === 0 ? 0 : Number(((cart.carbohydrate / cart.targetUserCarbohydrate) * 100).toFixed(1))}/>
                                    <label>{cart.carbohydrate} g / {cart.targetUserCarbohydrate} g</label>
                                </div>
                            </div>
                        </div> :
                        <p>Aby zobaczyć informacje o spożytym jedzeniu musisz uzupełnić <b>profil</b></p>}
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