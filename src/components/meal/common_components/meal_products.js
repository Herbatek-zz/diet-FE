import React, {Component} from 'react';
import _ from "lodash";
import {Tag} from "antd";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const Products = styled.div `
    border: 1px solid rgba(87, 87, 87, 0.2);
    border-radius: 5px;
    padding: 10px;
`;

class MealProducts extends Component {
    render() {

        const {products} = this.props;

        return (
            <Products>
                <h2>Products</h2>
                {_.map(products, product =>
                    <Tag key={product.id} style={{marginBottom: '5px'}}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </Tag>
                )}
            </Products>
        )
    }
}

export default MealProducts;