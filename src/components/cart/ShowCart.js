import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Progress, DatePicker, message, Button, Table, Popconfirm, Icon} from 'antd';
import locale from 'antd/lib/date-picker/locale/pl_PL';

import {fetchCart, setMenuItem, removeProductFromCart, removeMealFromCart} from "../../actions";
import AuthService from "../../helpers/auth_service";
import {NO_LOGGED_MESSAGE} from "../../helpers/messages";
import './ShowCart.css';
import {Link} from "react-router-dom";
import moment from "moment";


class ShowCart extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        currentDate: new Date()
    };

    componentDidMount() {
        this.props.setMenuItem('cart');

        if (this.state.isLoggedIn)
            this.props.fetchCart(new Date());
    }

    onChange = (date) => {
        this.props.fetchCart(date._d, () => message.error('Nie znaleziono koszyka'));
        this.setState({currentDate: date._d});
    };


    render() {
        if (!this.state.isLoggedIn)
            return <div className='show-cart'>{NO_LOGGED_MESSAGE}</div>;

        const {cart} = this.props;

        return (
            <div className='show-cart'>
                <div className='show-cart__head'>
                    <h1 className='head__title'><label>Koszyk</label></h1>
                    <div className='head__date-picker--left'>
                        <DatePicker onChange={this.onChange}
                                    locale={locale}
                                    size='large' format='DD-MM-YYYY'
                                    defaultValue={moment()}
                                    allowClear={false}
                                    disabledDate={current => current && current > moment().endOf('day')}/>

                    </div>
                </div>
                <div className='show-cart__body'>
                    <div className='show-cart__first-section'>
                        <div className='first-section__meals'>
                            <Table
                                className='cart-table'
                                locale={{emptyText: 'Brak posiłków'}}
                                title={() => <h3><label>Posiłki</label></h3>}
                                bordered={true}
                                pagination={false}
                                rowKey='id'
                                columns={[{
                                    title: 'Nazwa', dataIndex: 'name',
                                    render: (text, record) => <Link to={`/meals/${record.id}`}>{text}</Link>
                                }, {
                                    title: 'Waga',
                                    dataIndex: 'amount',
                                    width: '16%',
                                    render: (text) => `${text} g`
                                }, {
                                    title: '',
                                    dataIndex: 'id',
                                    width: '20%',
                                    render: (text) =>
                                        <Popconfirm title={'Czy na pewno chcesz usunąć ten posiłek z koszyka?'}
                                                    placement='bottomRight' okText='Tak' cancelText='Nie'
                                                    icon={<Icon type='question-circle-o' style={{color: 'red'}}/>}
                                                    onConfirm={() => this.props.removeMealFromCart(text, this.state.currentDate)}>
                                            <Button type='danger'>Usuń</Button>
                                        </Popconfirm>
                                }]} dataSource={cart.meals} size="default"/>
                        </div>
                        < div className='first-section__products'>
                            <Table
                                className='cart-table'
                                locale={{emptyText: 'Brak produktów'}}
                                title={() => <h3><label>Produkty</label></h3>}
                                bordered={true}
                                pagination={false}
                                rowKey='id'
                                columns={[{
                                    title: 'Nazwa',
                                    dataIndex: 'name',
                                    render: (text, record) => <Link to={`/products/${record.id}`}>{text}</Link>
                                }, {
                                    title: 'Waga',
                                    dataIndex: 'amount',
                                    width: '16%',
                                    render: (text) => `${text} g`
                                }, {
                                    width: '20%',
                                    title: '',
                                    dataIndex: 'id',
                                    render: (text) =>
                                        <Popconfirm title={'Czy na pewno chcesz usunąć ten produkt z koszyka?'}
                                                    placement='bottomRight' okText='Tak' cancelText='Nie'
                                                    icon={<Icon type='question-circle-o' style={{color: 'red'}}/>}
                                                    onConfirm={() => this.props.removeProductFromCart(text, this.state.currentDate)}>
                                            <Button type='danger'>Usuń</Button>
                                        </Popconfirm>
                                }]} dataSource={cart.products} size="default"/>
                        </div>
                    </div>
                    <div className='show-cart__second-section'>
                        <div className='second-section__wrapper'>
                            <Table
                                className='cart-table'
                                locale={{emptyText: 'Brak produktów'}}
                                title={() => <h3><label>Wymagane produkty</label></h3>}
                                bordered={true}
                                pagination={false}
                                rowKey='id'
                                columns={[{
                                    title: 'Nazwa', dataIndex: 'name',
                                    render: (text, record) => <Link to={`/products/${record.id}`}>{text}</Link>
                                }, {
                                    title: 'Waga',
                                    dataIndex: 'amount',
                                    render: (text) => `${text} g`
                                }
                                ]} dataSource={cart.allProducts} size="default"/>
                        </div>
                    </div>
                    <div className='show-cart__third-section'>
                        {cart.targetUserCalories ?
                            <div className='third-section__wrapper'>
                                <div className='third-section__calories'>
                                    <div className='progress__wrapper'>
                                        <label className='third-section__calories-title'><b>Kalorie</b></label>
                                        <Progress type="dashboard"
                                                  width={150}
                                                  percent={cart.kcal === undefined || cart.kcal === 0 ? 0 : Number(((cart.kcal / cart.targetUserCalories) * 100).toFixed(1))}
                                                  status={cart.kcal > cart.targetUserCalories ? "exception" : cart.kcal === cart.targetUserCalories ? "success" : "active"}/>
                                        <label>{cart.kcal} kcal / {cart.targetUserCalories} kcal</label>
                                    </div>
                                </div>
                                <div className='third-section__macro'>
                                    <div className='progress__wrapper'>
                                        <label className='third-section__macro-title'><b>Tłuszcze</b></label>
                                        <Progress type="circle"
                                                  width={80}
                                                  status={cart.fat > cart.targetUserFat ? "exception" : cart.fat === cart.targetUserFat ? "success" : "active"}
                                                  percent={cart.fat === undefined || cart.fat === 0 ? 0 : Number(((cart.fat / cart.targetUserFat) * 100).toFixed(1))}/>
                                        <label> {cart.fat} g / {cart.targetUserFat} g</label>
                                    </div>
                                    <div className='progress__wrapper'>
                                        <label className='third-section__macro-title'><b>Białko</b></label>
                                        <Progress type="circle"
                                                  width={80}
                                                  status={cart.protein > cart.targetUserProtein ? "exception" : cart.protein === cart.targetUserProtein ? "success" : "active"}
                                                  percent={cart.protein === undefined || cart.protein === 0 ? 0 : Number(((cart.protein / cart.targetUserProtein) * 100).toFixed(1))}/>
                                        <label> {cart.protein} g / {cart.targetUserProtein} g</label>
                                    </div>
                                    <div className='progress__wrapper'>
                                        <label className='third-section__macro-title'><b>Węglowodany</b></label>
                                        <Progress type="circle"
                                                  width={80}
                                                  status={cart.carbohydrate > cart.targetUserCarbohydrate ? "exception" : cart.carbohydrate === cart.targetUserCarbohydrate ? "success" : "active"}
                                                  percent={cart.carbohydrate === undefined || cart.carbohydrate === 0 ? 0 : Number(((cart.carbohydrate / cart.targetUserCarbohydrate) * 100).toFixed(1))}/>
                                        <label>{cart.carbohydrate} g / {cart.targetUserCarbohydrate} g</label>
                                    </div>
                                </div>
                            </div> :
                            <p className='text-info'>Aby zobaczyć informacje o spożytym jedzeniu musisz
                                uzupełnić <b>profil</b> i/lub dodać do koszyka <b>posiłek</b> lub <b>produkt</b>
                            </p>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({cart}) => {
    return {
        cart
    }
};

export default connect(mapStateToProps, {fetchCart, removeMealFromCart, removeProductFromCart, setMenuItem})(ShowCart);