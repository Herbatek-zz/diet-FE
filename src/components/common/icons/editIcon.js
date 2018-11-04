import {Link} from "react-router-dom";
import {Icon} from "antd";
import React from "react";

import './icons.css'

export default ({link, text = 'Edytuj'}) => {
    return (
        <Link to={link}>
            <span className='header-icon'>
                <Icon type="setting"/>
                {text}
            </span>
        </Link>
    )
}