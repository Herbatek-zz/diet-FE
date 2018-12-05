import {Alert} from "antd";
import React from "react";

const NoAuthAlert = () => {
    return <Alert
        style={{width: '80%', marginTop: '1%'}}
        message='Jesteś niezalogowany'
        description='Przepraszamy, ale tylko zalogowani użytkownicy mają dostęp do tej zawartości.'
        type='error'
        showIcon
    />
};

export default NoAuthAlert;