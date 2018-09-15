import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Collapse} from 'antd';

import {fetchMyProducts, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import {NO_LOGIN_MESSAGE} from "../../helpers/messages";

class ProductMyList extends Component {
    componentDidMount() {
        this.props.setMenuItem('product-my-list');
        if (AuthService.isLogged())
            this.props.fetchMyProducts(0)
    }

    renderProducts = () => {
        const {Panel} = Collapse;
        const {content, currentPage, totalElements} = this.props.products;

        return (
            <div>
                <Collapse className='collapse'>
                    {
                        _.map(content, (product) => {
                            const header = (
                                <div>
                                    <h3>{product.name}</h3> <Link to={`/products/${product.id}`}> More</Link>
                                </div>
                            );
                            return (
                                <Panel className='collapse__item' key={product.id} header={header}>
                                    <p>Description: {product.description}</p>
                                    <p>Calories: {product.kcal}</p>
                                    <img src={product.imageUrl} alt='product'/>
                                </Panel>
                            );
                        })
                    }
                </Collapse>
                <Pagination current={currentPage + 1} total={totalElements} onChange={this.onChange}/>
            </div>
        )
    };

    onChange = (page) => {
        this.props.fetchMyProducts(page - 1);
    };

    render() {
        return (
            <div className='content'>
                {AuthService.isLogged() ? this.renderProducts() : NO_LOGIN_MESSAGE}
            </div>
        );
    }
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
};

export default connect(mapStateToProps, {fetchMyProducts, setMenuItem})(ProductMyList);