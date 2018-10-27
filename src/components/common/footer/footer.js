import React from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;

export default () => {
    return (
        <Footer style={{textAlign: 'center', width: '100%', padding: '2px'}} className='footer'>
            Footer
        </Footer>
    );
}