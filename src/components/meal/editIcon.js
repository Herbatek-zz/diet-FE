import {Link} from "react-router-dom";
import {Icon} from "antd";
import React from "react";

export default ({mealId}) => {
    return (
        <Link to={`/meals/${mealId}/edit`}>
            <span className='head__span'>
                <Icon type="setting" style={{fontSize: '30px'}}/>
                Edytuj
            </span>
        </Link>
    )
}