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
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='content'>
                <div className='content__wrap--productList'>
                    <h1>Moje produkty</h1>
                    <div className='products__list'>
                        {Object.keys(this.props.products.content).length === 0 ? "Nie stworzyłeś jeszcze żadnych produktów" :
                            <ShowProductList products={this.props.products} onChange={this.onChange}/>}
                    </div>
                </div>
            </div>
        );
    }

    onChange = page => this.props.fetchMyProducts(page - 1, this.state.pageSize);
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
};

export default connect(mapStateToProps, {fetchMyProducts, setMenuItem})(ProductMyList);