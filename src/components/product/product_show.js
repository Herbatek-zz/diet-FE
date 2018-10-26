import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InputNumber, Modal} from 'antd';

import {fetchProduct, setMenuItem, addProductToCart, deleteProduct} from "../../actions";
import {LOADING_SPIN} from "../../helpers/messages";
import './css/product_show.css';
import AddToCartIcon from "../common/icons/addToCartIcon";
import AuthService from "../../helpers/auth_service";
import EditIcon from '../common/icons/editIcon';
import DeleteIcon from "../common/icons/deleteIcon";


class ProductShow extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        productId: this.props.match.params.id,
        modalVisible: false,
        amount: 0
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchProduct(this.state.productId);
    }

    render() {
        const {product} = this.props;

        if (!product)
            return LOADING_SPIN;

        return (
            <div className='productShow__content'>
                <div className='head'>
                    <h2>{product.name}</h2>
                    {this.state.isLoggedIn ?
                        <div className='head__iconsMenu'>
                            <AddToCartIcon onClick={() => this.setState({modalVisible: true})}/>
                            {AuthService.getDecodedToken().sub === product.userId ?
                                <EditIcon link={`/products/${product.id}/edit`}/> : ''}
                            {AuthService.getDecodedToken().sub === product.userId ?
                                <DeleteIcon confirmText='Czy na pewno chcesz usunąć ten produkt ?'
                                            onDelete={() => deleteProduct(product.id, () => this.props.history.push('/products/my'))}/> : ''}
                        </div> : ''}
                </div>
                <Modal
                    title="Ile gram produktu chcesz dodać do koszyka"
                    visible={this.state.modalVisible}
                    cancelText='Anuluj' okText='Dodaj'
                    onOk={() => {
                        this.props.addProductToCart(product.id, new Date(), this.state.amount);
                        this.setState({modalVisible: false})
                    }}
                    onCancel={() => this.setState({modalVisible: false})}
                >
                    <InputNumber min={0} value={this.state.amount} onChange={(value) => {
                        this.setState({amount: value})
                    }}/> [g]

                </Modal>
                <div className='body'>
                    <div className='productShow__imageContainer'>
                        <img src={product.imageUrl} alt='product' className='productShow__imageContainer--image'/>
                    </div>
                    <div className='productShow__description'>
                        <h2>Opis:</h2>
                        <h4>{product.description}</h4>
                    </div>
                    <div className='productShow__productInfo'>
                        <h2>Informacje</h2>
                        <h4>Białko: {Math.floor(product.protein)}</h4>
                        <h4>Węglowodany: {Math.floor(product.carbohydrate)}</h4>
                        <h4>Tłuszcz: {Math.floor(product.fat)}</h4>
                        <h4>Błonnik: {Math.floor(product.fibre)}</h4>
                        <h4>Kcal: {Math.floor(product.kcal)}</h4>
                        <h4>WW: {product.carbohydrateExchange.toFixed(2)}</h4>
                        <h4>WBT: {product.proteinAndFatEquivalent.toFixed(2)}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({products}, ownProps) => {
    return {
        product: products.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchProduct, setMenuItem, addProductToCart, deleteProduct})(ProductShow);