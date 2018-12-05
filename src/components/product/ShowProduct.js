import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InputNumber, Modal, message} from 'antd';

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
        amount: null,
        isActual: true
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchProduct(this.state.productId, () => {
            if (this.props.location.state)
                this.setState({isActual: false});
            else
                message.error("Nie odnaleziono produktu")
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addProductToCart(this.props.product.id, new Date(), this.state.amount);
        this.setState({modalVisible: false})
    };

    render() {
        const {product} = this.state.isActual ? this.props : this.props.location.state;

        if (!product)
            return LOADING_SPIN;

        return (
            <div className='product-show'>
                <div className='product-show__head'>
                    <h2><label>{product.name}</label></h2>
                    {this.state.isLoggedIn && this.state.isActual ?
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
        );
    }
}

const mapStateToProps = ({products}, ownProps) => {
    return {
        product: products.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchProduct, setMenuItem, addProductToCart, deleteProduct})(ProductShow);