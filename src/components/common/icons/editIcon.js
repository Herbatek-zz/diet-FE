import {Link} from "react-router-dom";
import {Icon} from "antd";
import React from "react";

import './icons.css'

export default ({link}) => {
    return (
        <Link to={link}>
            <span className='header-icon'>
                <Icon type="setting"/>
                Edytuj
            </span>
        </Link>
    )
}