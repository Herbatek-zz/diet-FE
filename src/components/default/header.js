import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Icon, Avatar} from 'antd';

import AuthService from '../../helpers/auth_service';
import './header.css';

const {Header} = Layout;

class MyHeader extends Component {
    loginButton = () => {
        if (AuthService.isLogged())
            return (
                <Link to='/' onClick={() => AuthService.logout()}>
                    <div className='header__login'>
                        <Icon type='logout' className='header__login--icon'/>
                        <p className='header__login--text'>Log out</p>
                    </div>
                </Link>
            );
        else
            return (
                <a href="http://localhost:8080/login/facebook">
                    <div className='header__login'>
                        <Icon type='login' className='header__login--icon'/>
                        <p className='header__login--text'>Log in</p>
                    </div>
                </a>
            );
    };

    userInfo = () => {
        if (AuthService.isLogged()) {
            const {pictureUrl, username} = AuthService.getDecodedToken();
            return (
                <Menu.Item className='header__avatar'>
                    <Avatar src={pictureUrl} className='header__avatar--picture'/>
                    <p className='header__avatar--username'>{username}</p>
                </Menu.Item>

            );
        }
    };

    render() {
        return (
            <Header className='header'>
                <div>
                    <Link to='/' className='header__logo'>Dieme</Link>
                </div>

                <Menu theme="dark"
                      mode='horizontal'
                      defaultSelectedKeys={[`${this.props.navSelectedItem}`]}
                >
                    <Menu.Item key='home' className='header__item'>
                        <Link to='/' className='header__item--link'>
                            <Icon type='home' className='header__item--icon'/>
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='product-list' className='header__item'>
                        <Link to='/products' className='header__item--link'>
                            <Icon type='bars' className='header__item--icon'/>
                            Products
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='product-create' className='header__item'>
                        <Link to='/products/new' className='header__item--link'>
                            <Icon type='plus-circle-o' className='header__item--icon'/>
                            Add product
                        </Link>
                    </Menu.Item>
                    <Menu.Item className='header__login'>
                        {this.loginButton()}
                    </Menu.Item>
                    {this.userInfo()}
                </Menu>

            </Header>
        );
    }
}


export default MyHeader;