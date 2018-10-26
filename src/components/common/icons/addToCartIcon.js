import {Icon} from "antd";
import React, {Component} from "react";

import './icons.css'

class AddToCartIcon extends Component {
    render() {
        return (
            <span className='header-icon' onClick={this.props.onClick}>
                <Icon type="shopping-cart" theme="outlined"/>
                Do koszyka
            </span>
        )
    }
}

export default AddToCartIcon;