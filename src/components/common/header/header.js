import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon, message, Badge} from 'antd';

import AuthService from '../../../helpers/auth_service';
import './header.css';
import connect from "react-redux/es/connect/connect";
import {fetchCart} from "../../../actions";
import Avatar from './avatar';

const {SubMenu, Item} = Menu;

class MyHeader extends Component {
    state = {
        pictureUrl: '',
        username: '',
        logged: false
    };

    componentDidMount() {
        if (AuthService.isLogged()) {
            const {pictureUrl, username} = AuthService.getDecodedToken();
            this.setState({pictureUrl, username, logged: true});
            this.props.fetchCart(new Date());
        }
        else
            this.setState({logged: false})
    }

    loginBtn = () => {
        return (
            <Item key='logout' className='menu__login'>
                <a href="https://localhost:8443/login/facebook">
                <span>
                    <Icon type='login' className='no-margin menu__login--icon'/>
                </span>
                </a>
            </Item>
        )
    };

    avatar = () => {
        return (
            <SubMenu
                className='menu__avatar'
                title={<Avatar pictureUrl={this.state.pictureUrl} username={this.state.username}/>}
                key='avatar'>
                <Item key='logout'>
                    <Link to='/' onClick={() => {
                        AuthService.logout();
                        message.success("Poprawnie wylogowano");
                        this.setState({logged: false})
                    }}>
                        <Icon type='logout'/>
                        Wyloguj
                    </Link>
                </Item>
            </SubMenu>
        );
    };

    cart = () => {
        if (this.state.logged)
            return (
                <Item key='cart' className='menu__cart'>
                    <Link to={"/cart"}>
                        <Badge count={this.props.cart.itemCounter} style={{backgroundColor: '#1890ff'}}>
                            <Icon type="shopping-cart" theme="outlined" style={{fontSize: '20px'}} className='no-margin'/>
                        </Badge>
                    </Link>
                </Item>
            )
    };

    render() {
        return (
            <Menu defaultSelectedKeys={[this.props.selectedMenuItem]} mode="horizontal">
                <Item key='logo' className='menu__logo'>
                    <Link to='/'/>
                </Item>

                <Item key='home' className='menu__home'>
                    <Link to='/'><Icon type='home' className='no-margin'/></Link>
                </Item>

                <SubMenu title={<span><Icon type="setting" className='no-margin menu__products--icon'/></span>} key='products'>
                    <Item key='product-list'>
                        <Link to='/products'>
                            <Icon type='bars'/>Wszystkie
                        </Link>
                    </Item>
                    <Item key='product-my-list'>
                        <Link to='/products/my'>
                            <Icon type='bars'/>Moje
                        </Link>
                    </Item>
                    <Item key='product-create'>
                        <Link to='/products/new'>
                            <Icon type='plus-circle-o'/>Dodaj nowy
                        </Link>
                    </Item>
                </SubMenu>

                <SubMenu title={<span><Icon type="setting" className='no-margin menu__meals--icon'/></span>} key='meals'>
                    <Item key='meal-list'>
                        <Link to='/meals'>
                            <Icon type='bars'/>Wszystkie
                        </Link>
                    </Item>
                    <Item key='meal-my-list'>
                        <Link to='/meals/my'>
                            <Icon type='bars'/>Moje
                        </Link>
                    </Item>
                    <Item key='meal-favourite'>
                        <Link to='/meals/favourite'>
                            <Icon type='bars'/>Ulubione
                        </Link>
                    </Item>
                    <Item key='meal-create'>
                        <Link to='/meals/new'>
                            <Icon type='plus-circle-o'/>Dodaj nowy
                        </Link>
                    </Item>
                </SubMenu>
                {this.cart()}
                {this.state.logged ? this.avatar() : this.loginBtn()}

            </Menu>
        );
    }
}

const mapStateToProps = ({selectedMenuItem, cart}) => {
    return {
        selectedMenuItem,
        cart
    }
};

export default connect(mapStateToProps, {fetchCart})(MyHeader);