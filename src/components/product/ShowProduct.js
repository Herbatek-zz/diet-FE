import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InputNumber, Modal, Alert} from 'antd';

import {fetchProduct, setMenuItem, addProductToCart, deleteProduct} from "../../actions";
import {LOADING_SPIN} from "../../helpers/messages";
import './ShowProducts.css';
import AddToCartIcon from "../common/icons/addToCartIcon";
import AuthService from "../../helpers/auth_service";
import EditIcon from '../common/icons/editIcon';
import DeleteIcon from "../common/icons/deleteIcon";
import ItemInfoTable from '../common/item-info-table';


class ProductShow extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        productId: this.props.match.params.id,
        modalVisible: false,
        amount: null
    };

    componentDidMount() {
        this.props.fetchProduct(this.state.productId);
        this.props.setMenuItem('');
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.addProductToCart(this.props.product.id, new Date(), this.state.amount);
        this.setState({modalVisible: false})
    };

    renderProduct = (product, isActual) => {
        return (
            <div className='product-show'>
                <div className='product-show__head'>
                    <h2><label>{product.name}</label></h2>
                    {this.state.isLoggedIn && isActual ?
                        <div className='product-show__icon-menu'>
                            <AddToCartIcon onClick={() => this.setState({modalVisible: true})}/>
                            {AuthService.getDecodedToken().sub === product.userId ?
                                <EditIcon link={`/products/${product.id}/edit`}/> : ''}
                            {AuthService.getDecodedToken().sub === product.userId ?
                                <DeleteIcon confirmText='Czy na pewno chcesz usunąć ten produkt ?'
                                            onDelete={() => deleteProduct(product.id, () => this.props.history.push('/products/my'))}/> : ''}
                        </div> : ''}
                </div>
                <div className='product-show__body'>
                    <div className='product-show__first-panel'>
                        <div className='product-show__image-container'>
                            <img src={product.imageUrl} alt='product' className='product-show__image'/>
                        </div>
                        <div className='product-show__info'>
                            <div className='product-show__info-wrapper'>
                                <label><h2 className='product-show__info-text'>Informacje o produkcie</h2></label>
                                <ItemInfoTable item={product}/>
                            </div>
                        </div>
                    </div>
                    <div className='product-show__description'>
                        <h2><label>Opis:</label></h2>
                        <h4>{product.description}</h4>
                    </div>
                </div>
                <Modal
                    title={<label>Ile gram produktu chcesz dodać do koszyka?</label>}
                    visible={this.state.modalVisible}
                    cancelText='Anuluj'
                    okText='Dodaj'
                    onOk={this.onSubmit}
                    onCancel={() => this.setState({modalVisible: false})}
                >
                    <form className='form' onSubmit={this.onSubmit} autoComplete='off'>
                        <InputNumber
                            min={0}
                            autoFocus
                            value={this.state.amount}
                            onChange={(value) => this.setState({amount: value})}
                        />
                    </form>

                </Modal>
            </div>
        )
    };

    render() {
        const {product} = this.props;

        if (!product || product.isLoading)
            return LOADING_SPIN;

        if(product.isError && !this.props.location.state)
            return <Alert
                message="Błąd"
                style={{width: '80%', marginTop: '1%'}}
                description="Niestety nie udało nam się znaleźć tego produktu."
                type="error"
                showIcon
            />;

        return (this.props.location.state && this.props.location.state.product && product.isError ?
            this.renderProduct(this.props.location.state.product, false) : this.renderProduct(product, true));
    }
}

const mapStateToProps = ({products}) => {
    return {product: products.selectedProduct}
};

export default connect(mapStateToProps, {fetchProduct, setMenuItem, addProductToCart, deleteProduct})(ProductShow);