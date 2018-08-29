import React, {Component} from 'react';

import AuthService from '../auth_service';
import Header from '../default/header';
import Footer from '../default/footer';
import './login.css';

export default class Login extends Component {
    componentWillMount(){
        if(AuthService.isLogged())
            this.props.history.replace('/');
    }

    render() {
        return (
            <div>
                <Header/>
                <div className='login'>
                    <a href="http://localhost:8080/login/facebook" className='login__facebook'>Sign in with
                        facebook</a>
                </div>
                <Footer/>
            </div>
        );
    }
}