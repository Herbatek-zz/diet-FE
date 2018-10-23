import {Icon} from "antd";
import React, {Component} from "react";

class AddToCartIcon extends Component {
    render() {
        return (
            <span className='head__span' onClick={this.props.onClick}>
                <Icon type="shopping-cart" theme="outlined"/>
                Do koszyka
            </span>
        )
    }
}

export default (AddToCartIcon);