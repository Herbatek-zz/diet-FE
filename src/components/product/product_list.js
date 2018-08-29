import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { Pagination } from 'antd';

import {fetchProducts} from "../../actions";
import Header from "../default/header";
import Footer from '../default/footer';
import './product_list.css';

class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    renderProducts() {
        return _.map(this.props.products, product => {
            return (

                <li className='list-group-item' key={product.id}>
                    <Link to={`/products/${product.id}`} className='list__item'>{product.name}</Link>
                </li>

            );
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className='content'>
                    <ul className='list'>
                        {this.renderProducts()}
                    </ul>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {products: state.products};
}

export default connect(mapStateToProps, {fetchProducts})(ProductList);