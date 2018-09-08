import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon, Avatar} from 'antd';

import AuthService from '../../helpers/auth_service';
import './header.css';

const {SubMenu, Item} = Menu;

class MyHeader extends Component {

    loginAvatar = () => {
        if (AuthService.isLogged()) {
            const {pictureUrl, username} = AuthService.getDecodedToken();
            return (
                <SubMenu title={<span className="submenu__avatar"><Avatar src={pictureUrl}/>{username}</span>}
                         key='avatar' className='loginAvatar'>
                    <Item key='logout'>
                        <Link to='/' onClick={() => AuthService.logout()} className='avatar__link'>
                            <Icon type='logout' className='header__menu--icon'/>
                            Log out
                        </Link>
                    </Item>
                </SubMenu>
            );
        }
        else
            return (
                <Item key='logout' className='loginAvatar'>
                    <a href="http://localhost:8080/login/facebook" className='header__icon'>
                        <div className='header__login'>
                            <Icon type='login' className='header__icon'/>
                        </div>
                    </a>
                </Item>
            );
    };

    render() {
        return (
            <Menu defaultSelectedKeys={[`${this.props.menuSelectedItem}`]} mode="horizontal">
                <Item key='home'>
                    <Link to='/' className='header__icon'><Icon type='home'/></Link>
                </Item>

                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting"/>Products</span>}
                         key='products'>
                    <Item key='product-list'>
                        <Link to='/products'>
                            <Icon type='bars' className='header__menu--icon'/>
                            All Products
                        </Link>
                    </Item>
                    <Item key='product-my-list'>
                        <Link to='/products/my'>
                            <Icon type='bars' className='header__menu--icon'/>
                            My products
                        </Link>
                    </Item>
                    <Item key='product-create'>
                        <Link to='/products/new'>
                            <Icon type='plus-circle-o' className='header__menu--icon'/>
                            Add product
                        </Link>
                    </Item>
                </SubMenu>

                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting"/>Meals</span>} key='meals'>
                    <Item key='meal-list'>
                        <Link to='/meals'>
                            <Icon type='bars' className='header__menu--icon'/>
                            All Meals
                        </Link>
                    </Item>
                    <Item key='meal-my-list'>
                        <Link to='/meals/my'>
                            <Icon type='bars' className='header__menu--icon'/>
                            My meals
                        </Link>
                    </Item>
                    <Item key='meal-create'>
                        <Link to='/meals/new'>
                            <Icon type='plus-circle-o' className='header__menu--icon'/>
                            Add meal
                        </Link>
                    </Item>
                </SubMenu>
                {this.loginAvatar()}
            </Menu>
        );
    }
}

export default MyHeader;