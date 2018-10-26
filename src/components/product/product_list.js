import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input} from 'antd';

import {fetchProducts, searchProducts, setMenuItem} from "../../actions";
import ShowProductList from '../common/show_product_list';
import {LOADING_SPIN} from '../../helpers/messages';
import './css/product_list.css';

class ProductList extends Component {
    state = {
        searched: false,
        searchValue: '',
        pageSize: 5
    };

    componentDidMount() {
        this.props.setMenuItem('product-list');
        this.props.fetchProducts(0, this.state.pageSize);
    }

    render() {
        const {Search} = Input;
        const {searchValue, pageSize} = this.state;

        return (
            <div className='content__wrap--productList'>
                <div className='productsList__menu'>
                    <h1>Lista wszystkich produktów</h1>
                    <Search
                        placeholder="Wyszukaj produkt"
                        onSearch={value => {
                            this.props.searchProducts(value, 0, pageSize);
                            this.setState({
                                searched: true
                            });
                        }}
                        onChange={(e) => this.setState({searchValue: e.target.value})}
                        value={searchValue}
                        enterButton
                        size="large"
                    />
                </div>
                <div className='products__list'>
                    {Object.keys(this.props.products.content).length === 0 ? LOADING_SPIN :
                        <ShowProductList products={this.props.products} onChange={this.onChange}/>}
                </div>
            </div>
        );
    }

    onChange = page => {
        const {searched, searchValue, pageSize} = this.state;
        searched ? this.props.searchProducts(searchValue, page - 1, pageSize) : this.props.fetchProducts(page - 1, pageSize);
    };
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
};

export default connect(mapStateToProps, {fetchProducts, searchProducts, setMenuItem})(ProductList);