import {Avatar} from "antd";
import React from "react";

export default ({pictureUrl, username}) => {
    return (
        <span className='menu__avatar--span'>
            <Avatar src={pictureUrl} size='small'/>
            {username}
        </span>
    )
}