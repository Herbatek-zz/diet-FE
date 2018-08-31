import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';

import {fetchProduct} from "../../actions";
import Header from '../default/header';
import Footer from '../default/footer';


class ProductShow extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchProduct(id);
    }

    render() {
        const {product} = this.props;

        if (!product)
            return <div>Loading...</div>;


        return (
            <Layout>
                <Header />
                <div className='content'>
                    <h4>Name: {product.name}</h4>
                    <h5>Description: {product.description}</h5>
                    <img src={product.imageUrl} alt='product' />
                    <h5>Protein: {product.protein}</h5>
                    <h5>Carbohydrate: {product.carbohydrate}</h5>
                    <h5>Fat: {product.fat}</h5>
                    <h5>Fibre: {product.fibre}</h5>
                    <h5>Kcal: {product.kcal}</h5>
                    <h5>CE: {product.carbohydrateExchange}</h5>
                    <h5>PAFE: {product.proteinAndFatEquivalent}</h5>
                </div>
                <Footer/>
            </Layout>
        );
    }
}

function mapStateToProps({products}, ownProps) {
    return {product: products[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchProduct})(ProductShow);