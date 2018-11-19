import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InputNumber, Modal} from 'antd';

import {fetchProduct, setMenuItem, addProductToCart, deleteProduct} from "../../actions";
import {LOADING_SPIN} from "../../helpers/messages";
import './product_show.css';
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
            <div className='container__product-show'>
                <div className='head-product-show'>
                    <h2><label>{product.name}</label></h2>
                    {this.state.isLoggedIn ?
                        <div className='head-product-show__icon-menu'>
                            <AddToCartIcon onClick={() => this.setState({modalVisible: true})}/>
                            {AuthService.getDecodedToken().sub === product.userId ?
                                <EditIcon link={`/products/${product.id}/edit`}/> : ''}
                            {AuthService.getDecodedToken().sub === product.userId ?
                                <DeleteIcon confirmText='Czy na pewno chcesz usunąć ten produkt ?'
                                            onDelete={() => deleteProduct(product.id, () => this.props.history.push('/products/my'))}/> : ''}
                        </div> : ''}
                </div>
                <div className='body-product-show'>
                    <div className='body-product-show__main-informations'>
                        <div className='main-informations__image-container'>
                            <img src={product.imageUrl} alt='product' className='main-informations__image-container--image'/>
                        </div>
                        <div className='main-informations__product-info'>
                            <div className='product-info__content'>
                                <label><h2>Informacje o produkcie</h2></label>
                                <ItemInfoTable item={product}/>
                            </div>
                        </div>
                    </div>
                    <div className='body-product-show__description'>
                        <h2><label>Opis:</label></h2>
                        <h4>{product.description}</h4>
                    </div>
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