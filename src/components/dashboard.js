import React, {Component} from 'react';
import {Layout} from 'antd';

import Header from './default/header';
import Footer from './default/footer';
import './dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <Layout>
                <Header navSelectedItem='home'/>
                <div className='content'>
                </div>
                <Footer/>
            </Layout>
        );
    }
}

export default Dashboard;
