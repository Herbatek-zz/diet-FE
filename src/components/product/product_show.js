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
            <div className='container__product-show'>
                <div className='head-product-show'>
                    <h2>{product.name}</h2>
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
                            <h2>Informacje o produkcie</h2>
                            <table className='main-informations__product-info--table'>
                                <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Wartość/100g</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr className='product-info__table--row'>
                                        <td>Białko</td>
                                        <td>{Math.floor(product.protein)}g</td>
                                    </tr>
                                    <tr className='product-info__table--row'>
                                        <td>Węglowodany</td>
                                        <td>{Math.floor(product.carbohydrate)}g</td>
                                    </tr>
                                    <tr className='product-info__table--row'>
                                        <td>Tłuszcz</td>
                                        <td>{Math.floor(product.fat)}g</td>
                                    </tr>
                                    <tr className='product-info__table--row'>
                                        <td>Błonnik</td>
                                        <td>{Math.floor(product.fibre)}g</td>
                                    </tr>
                                    <tr className='product-info__table--row'>
                                        <td>Kcal</td>
                                        <td>{Math.floor(product.kcal)}</td>
                                    </tr>
                                    <tr className='product-info__table--row'>
                                        <td>WW</td>
                                        <td>{product.carbohydrateExchange.toFixed(2)}</td>
                                    </tr>
                                    <tr className='product-info__table--row'>
                                        <td>WBT</td>
                                        <td>{product.proteinAndFatEquivalent.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='body-product-show__description'>
                        <h2>Opis:</h2>
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