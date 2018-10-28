import React from 'react';
import {Spin} from "antd";

export const NO_LOGGED_MESSAGE = (
    <div className='container__message'>
        <p><b>Tylko zalogowani użytkownicy mają dostęp to tej strony</b></p>
    </div>
);

export const LOADING_SPIN = (
    <div className='container__loading-spin'>
        <Spin size='large'/>
    </div>);