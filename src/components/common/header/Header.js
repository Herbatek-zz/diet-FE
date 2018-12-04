import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon, message, Badge} from 'antd';

import MyIcon from '../my-icon';
import AuthService from '../../../helpers/auth_service';
import connect from "react-redux/es/connect/connect";
import Avatar from './avatar';
import {fetchCart, fetchUserFromCookie} from "../../../actions";
import './Header.css';

const {SubMenu, Item} = Menu;

class MyHeader extends Component {
    state = {logged: false};

    componentDidMount() {
        if (AuthService.isLogged()) {
            this.props.fetchUserFromCookie();
            this.props.fetchCart(new Date());
            this.setState({logged: true});
        } else
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
                title={<Avatar pictureUrl={this.props.loggedUser.imageUrl} username={this.props.loggedUser.username}/>}
                key='avatar'>
                <Item key='logout'>
                    <Link to={`/user/${AuthService.getDecodedToken().sub}`}>
                        <Icon type="user" theme="outlined"/>
                        Profil
                    </Link>
                </Item>
                <Item key='profile'>
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
                        <Badge count={this.props.cart.itemCounter} style={{boxShadow: 'none'}}>
                            <MyIcon type="icon-cart" theme="outlined" style={{fontSize: '20px'}} className='no-margin'/>
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

                <SubMenu title={<span><MyIcon type="icon-foodvariant" className='no-margin menu__products--icon'/></span>}
                         key='products'>
                    <Item key='product-list'>
                        <Link to='/products'>
                            <Icon type='bars'/>Wszystkie
                        </Link>
                    </Item>
                    <Item key='product-my-list' disabled={!this.state.logged}>
                        <Link to='/products/my'>
                            <Icon type='bars'/>Moje
                        </Link>
                    </Item>
                    <Item key='product-create' disabled={!this.state.logged}>
                        <Link to='/products/new'>
                            <Icon type='plus-circle-o'/>Dodaj nowy
                        </Link>
                    </Item>
                </SubMenu>

                <SubMenu title={<span><MyIcon type="icon-food2" className='no-margin menu__meals--icon'/></span>} key='meals'>
                    <Item key='meal-list'>
                        <Link to='/meals'>
                            <Icon type='bars'/>Wszystkie
                        </Link>
                    </Item>
                    <Item key='meal-my-list' disabled={!this.state.logged}>
                        <Link to='/meals/my'>
                            <Icon type='bars'/>Moje
                        </Link>
                    </Item>
                    <Item key='meal-favourite' disabled={!this.state.logged}>
                        <Link to='/meals/favourite'>
                            <Icon type='heart'/>Ulubione
                        </Link>
                    </Item>
                    <Item key='meal-create' disabled={!this.state.logged}>
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

const mapStateToProps = ({selectedMenuItem, cart, loggedUser}) => {
    return {
        selectedMenuItem,
        cart,
        loggedUser
    }
};

export default connect(mapStateToProps, {fetchCart, fetchUserFromCookie})(MyHeader);