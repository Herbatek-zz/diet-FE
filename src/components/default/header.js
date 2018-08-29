import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import AuthService from '../auth_service';

class Header extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
    }

    render() {
        let loginButton = '';
        if (AuthService.isLogged())
            loginButton =
                (<Link to='/' className='header_nav-item' onClick={() => AuthService.logout()}>
                    <i className="material-icons">exit_to_app</i>
                    Sign out
                </Link>);
        else
            loginButton =
                <Link to='/login' className='header_nav-item'>
                    <i className="material-icons">person</i>
                    Sign in
                </Link>;
        return (
            <div className='header'>
                <Link to='/' className='header__logo'>Dieme</Link>
                <Link to='/' className='header_nav-item'>
                    <i className="material-icons">home</i>Home
                </Link>
                <Link to='/products' className='header_nav-item'>
                    <i className="material-icons">format_list_bulleted</i>
                    Products
                </Link>
                <Link to='/products/new' className='header_nav-item'>
                    <i className="material-icons">add_circle_outline</i>
                    Add product
                </Link>
                {loginButton}
            </div>
        );
    }
}

export default Header;