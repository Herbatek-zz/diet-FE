import React from 'react';
import {Layout} from 'antd';

import './Footer.css';

const {Footer} = Layout;

export default () => {
    return (
        <Footer className='footer'>
            Copyright &copy; 2018 by Piotr Cużytek
        </Footer>
    );
}