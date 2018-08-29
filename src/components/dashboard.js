import React, {Component} from 'react';

import Header from './default/header';
import Footer from './default/footer';

class Dashboard extends Component {
    render() {
        return (
            <div className='container'>
                <Header/>
                content information
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;
