import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon, Avatar} from 'antd';

import AuthService from '../../helpers/auth_service';
import './header.css';
import connect from "react-redux/es/connect/connect";

const {SubMenu, Item} = Menu;

class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureUrl: '',
            username: '',
            logged: false
        };
    }

    componentDidMount() {
        if (AuthService.isLogged()) {
            const {pictureUrl, username} = AuthService.getDecodedToken();
            this.setState({pictureUrl, username, logged: true});
        }
        else {
            this.setState({logged: false})
        }
    }

    loginButton = () => {
        return (
            <Item key='logout' className='menu__login'>
                <a href="http://localhost:8080/login/facebook">
                    <span><Icon type='login' className='no-margin menu__login--icon'/></span>
                </a>
            </Item>
        );
    };

    avatar = () => {
        return (
            <SubMenu
                className='menu__avatar'
                title={<span className='menu__avatar--span'><Avatar src={this.state.pictureUrl}/>{this.state.username}</span>}
                key='avatar'>
                <Item key='logout'>
                    <Link to='/' onClick={() => {
                        AuthService.logout();
                        this.setState({logged: false})
                    }}>
                        <Icon type='logout'/>Log out
                    </Link>
                </Item>
            </SubMenu>
        );
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

                <SubMenu title={<span><Icon type="setting"/>Products</span>} key='products'>
                    <Item key='product-list'>
                        <Link to='/products'>
                            <Icon type='bars'/>All Products
                        </Link>
                    </Item>
                    <Item key='product-my-list'>
                        <Link to='/products/my'>
                            <Icon type='bars'/>My products
                        </Link>
                    </Item>
                    <Item key='product-create'>
                        <Link to='/products/new'>
                            <Icon type='plus-circle-o'/>Add product
                        </Link>
                    </Item>
                </SubMenu>

                <SubMenu title={<span><Icon type="setting"/>Meals</span>} key='meals'>
                    <Item key='meal-list'>
                        <Link to='/meals'>
                            <Icon type='bars'/>All Meals
                        </Link>
                    </Item>
                    <Item key='meal-my-list'>
                        <Link to='/meals/my'>
                            <Icon type='bars'/>My meals
                        </Link>
                    </Item>
                    <Item key='meal-create'>
                        <Link to='/meals/new'>
                            <Icon type='plus-circle-o'/>Add meal
                        </Link>
                    </Item>
                </SubMenu>
                {this.state.logged ? this.avatar() : this.loginButton()}
            </Menu>
        );
    }
}

const mapStateToProps = ({selectedMenuItem}) => {
    return {selectedMenuItem}
};

export default connect(mapStateToProps, null)(MyHeader);