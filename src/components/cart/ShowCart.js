import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DatePicker, message} from 'antd';
import locale from 'antd/lib/date-picker/locale/pl_PL';
import moment from "moment";
import {fetchCart, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import ProgressBars from './ProgressBars';
import AllProductsTable from './AllProductsTable';
import MealsTable from './MealsTable';
import ProductsTable from './ProductsTable';
import {NO_LOGGED_MESSAGE} from "../../helpers/messages";
import './ShowCart.css';

class ShowCart extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        currentDate: new Date()
    };

    componentDidMount() {
        this.props.setMenuItem('cart');
        if (this.state.isLoggedIn)
            this.props.fetchCart(new Date());
    }

    onChange = (date) => {
        this.props.fetchCart(date._d, () => message.error('Nie znaleziono koszyka'));
        this.setState({currentDate: date._d});
    };


    render() {
        const {cart} = this.props;
        if (!this.state.isLoggedIn)
            return <div className='show-cart'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='show-cart'>
                <div className='show-cart__head'>
                    <h1 className='head__title'>
                        <label>Koszyk</label>
                    </h1>
                    <div className='head__date-picker--left'>
                        <DatePicker onChange={this.onChange}
                                    locale={locale}
                                    size='large'
                                    format='DD-MM-YYYY'
                                    defaultValue={moment()}
                                    allowClear={false}
                                    disabledDate={current => current && current > moment().endOf('day')}
                        />
                    </div>
                </div>
                <div className='show-cart__body'>
                    <div className='show-cart__first-section'>
                        <div className='first-section__meals'>
                            <MealsTable meals={cart.meals} currentDate={this.state.currentDate}/>
                        </div>
                        < div className='first-section__products'>
                            <ProductsTable products={cart.products} currentDate={this.state.currentDate}/>
                        </div>
                    </div>
                    <div className='show-cart__second-section'>
                        <div className='second-section__wrapper'>
                            <AllProductsTable allProducts={cart.allProducts}/>
                        </div>
                    </div>
                    <div className='show-cart__third-section'>
                        <ProgressBars cart={cart}/>
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

export default connect(mapStateToProps, {fetchCart, setMenuItem})(ShowCart);