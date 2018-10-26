import {Icon, Popconfirm} from "antd";
import React, {Component} from "react";

import './icons.css'

class DeleteIcon extends Component {
    render() {
        return (
            <Popconfirm title={this.props.confirmText} placement='bottomLeft' okText='Tak' cancelText='Nie'
                        icon={<Icon type='question-circle-o' style={{color: 'red'}}/>} onConfirm={this.props.onDelete}>
                <span className='header-icon'>
                    <Icon type="delete" theme="outlined"/>
                    Usuń
                </span>
            </Popconfirm>
        )
    }
}

export default DeleteIcon;