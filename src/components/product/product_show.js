import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchProduct, setMenuItem} from "../../actions";
import {SHOW_LOADING_SPIN} from "../../helpers/messages";


class ProductShow extends Component {
    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchProduct(this.props.match.params.id);
    }

    render() {
        const {product} = this.props;

        if (!product)
            return SHOW_LOADING_SPIN;


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