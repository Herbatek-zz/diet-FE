import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spin} from 'antd';

import {fetchProduct, setMenuItem} from "../../actions";


class ProductShow extends Component {
    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchProduct(id);
    }

    render() {
        const {product} = this.props;

        if (!product)
            return (
                <div className='content loading-spin'>
                    <Spin size="large"/>
                </div>
            );


        return (
            <div className='content'>
                <h4>Name: {product.name}</h4>
                <h5>Description: {product.description}</h5>
                <img src={product.imageUrl} alt='product' className='image-border-shadow'/>
                <h5>Protein: {product.protein}</h5>
                <h5>Carbohydrate: {product.carbohydrate}</h5>
                <h5>Fat: {product.fat}</h5>
                <h5>Fibre: {product.fibre}</h5>
                <h5>Kcal: {product.kcal}</h5>
                <h5>CE: {product.carbohydrateExchange}</h5>
                <h5>PAFE: {product.proteinAndFatEquivalent}</h5>
            </div>
        );
    }
}

const mapStateToProps = ({products}, ownProps) => {
    return {
        product: products.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchProduct, setMenuItem})(ProductShow);