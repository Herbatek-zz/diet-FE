import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Layout, Collapse} from 'antd';

import {fetchMyProducts} from "../../actions";
import Header from "../default/header";
import Footer from '../default/footer';
import './product_list.css';

class ProductMyList extends Component {
    componentDidMount() {
            this.props.fetchMyProducts(0);
    }

    renderProducts = () => {
        const {Panel} = Collapse;
        const {content} = this.props.products;


        return _.map(content, (product) => {
            return (
                <Panel
                    className='collapse__item'
                    key={product.id}
                    header={
                        <div>
                            <h3>{product.name}</h3> <Link to={`/products/${product.id}`}> More</Link>
                        </div>}>
                    <p>Description: {product.description}</p>
                    <p>Calories: {product.kcal}</p>
                    <img src={product.imageUrl} alt='product'/>
                </Panel>

            );
        });
    };

    onChange = (page) => {
        this.props.fetchMyProducts(page - 1);
    };

    render() {
        const {currentPage, totalElements} = this.props.products;

        return (
            <Layout>
                <Header navSelectedItem='product-my-list'/>

                <div className='content'>
                    <Collapse className='collapse'>
                        {this.renderProducts()}
                    </Collapse>,
                    <Pagination current={currentPage + 1} total={totalElements} onChange={this.onChange}/>
                </div>

                <Footer/>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {products: state.products};
}

export default connect(mapStateToProps, {fetchMyProducts})(ProductMyList);