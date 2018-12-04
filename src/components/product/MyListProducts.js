import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMyProducts, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import {NO_LOGGED_MESSAGE} from "../../helpers/messages";
import ShowProductList from "../common/show_product_list";


class ProductMyList extends Component {
    state = {
        pageSize: 5,
        isLoggedIn: AuthService.isLogged()
    };

    componentDidMount() {
        this.props.setMenuItem('product-my-list');
        if (this.state.isLoggedIn)
            this.props.fetchMyProducts(0, this.state.pageSize)
    }

    render() {

        if (!this.state.isLoggedIn)
            return <div className='content__list'><label>{NO_LOGGED_MESSAGE}</label></div>;
        if (Object.keys(this.props.products.content).length === 0)
            return <div className='content__list'>
                <div className='container__message'><label>Nie stworzyłeś jeszcze żadnych produktów</label></div>
            </div>;

        return (
            <div className='content__list'>
                <div className='header'>
                    <h1 className='header__title'>Moje produkty</h1>
                </div>
                <div className='list'>
                    <ShowProductList products={this.props.products}
                                     onChange={page => this.props.fetchMyProducts(page - 1, this.state.pageSize)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
};

export default connect(mapStateToProps, {fetchMyProducts, setMenuItem})(ProductMyList);