import {Icon, Popconfirm} from "antd";
import {deleteMeal} from "../../actions";
import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

class DeleteIcon extends Component {
    render() {
        return (
            <Popconfirm title="Czy na pewno chcesz usunąć ten posiłek ?" okText="Tak" cancelText="Nie"
                onConfirm={() => deleteMeal(this.props.mealId, this.props.afterDelete)} >
                <span className='head__span'>
                    <Icon type="delete" theme="outlined"/>
                    Usuń
                </span>
            </Popconfirm>
        )
    }
}

export default connect(null, {deleteMeal})(DeleteIcon);