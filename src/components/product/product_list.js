import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Layout, Collapse} from 'antd';

import {fetchProducts} from "../../actions";
import Header from "../default/header";
import Footer from '../default/footer';

class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProducts(0);
    }

    renderProducts = () => {
        const {content} = this.props.products;
        const {Panel} = Collapse;

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
        this.props.fetchProducts(page - 1);
    };

    render() {
        const {currentPage, totalElements} = this.props.products;

        return (
            <Layout>
                <Header menuSelectedItem='product-list'/>

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

const mapStateToProps = ({products}) => {
    return {
        products
    }
};

export default connect(mapStateToProps, {fetchProducts})(ProductList);