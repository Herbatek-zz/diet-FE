import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Avatar, Input, Spin, Tooltip, message, Modal, InputNumber, Button, Table} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from "react-router-dom";
import {
    fetchMeal,
    fetchProductsInfinity,
    searchProducts,
    searchProductsInfinity,
    editMeal,
    setMenuItem
} from "../../actions";
import './AddProductToMeal.css';
import AuthService from "../../helpers/auth_service";
import {LOADING_SPIN} from "../../helpers/messages";
import _ from "lodash";
import NoAuthAlert from "../common/NoAuthAlert";

const {Item} = List;
const {Search} = Input;

class MealEdit extends Component {
    state = {
        sent: false,
        mealId: this.props.match.params.id,
        modalVisible: false,
        searched: false,
        searchValue: '',
        loading: false,
        isLoggedIn: AuthService.isLogged(),
        pageSize: 12,
        name: '',
        products: [],
        productToAdd: {},
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        fibre: 0,
        kcal: 0,
        carbohydrateExchange: 0,
        proteinAndFatEquivalent: 0,
        mealLoaded: false
    };

    componentDidMount() {
        this.props.setMenuItem('');

        if (this.state.isLoggedIn) {
            this.props.fetchMeal(this.state.mealId);
            this.props.fetchProductsInfinity(0, this.state.pageSize);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {meal} = this.props;
        if (!this.state.mealLoaded && this.props.meal.id && !this.props.meal.isLoading && !this.props.meal.isError) {
            this.setState({
                mealLoaded: true,
                name: this.props.meal.name,
                products: this.props.meal.products,
                protein: (() => {
                    let sum = 0;
                    this.props.meal.products.forEach(product => sum += product.protein * product.amount / 100);
                    return sum;
                })(),
                carbohydrate: (() => {
                    let sum = 0;
                    this.props.meal.products.forEach(product => sum += product.carbohydrate * product.amount / 100);
                    return sum;
                })(),
                fat: (() => {
                    let sum = 0;
                    this.props.meal.products.forEach(product => sum += product.fat * product.amount / 100);
                    return sum;
                })(),
                fibre: (() => {
                    let sum = 0;
                    this.props.meal.products.forEach(product => sum += product.fibre * product.amount / 100);
                    return sum;
                })(),
                kcal: (() => {
                    let sum = 0;
                    this.props.meal.products.forEach(product => sum += product.kcal * product.amount / 100);
                    return sum;
                })(),
                carbohydrateExchange: (() => {
                    let sum = 0;
                    this.props.meal.products.forEach(product => sum += product.carbohydrateExchange * product.amount / 100);
                    return sum;
                })(),
                proteinAndFatEquivalent: (() => {
                    let sum = 0;
                    this.props.meal.products.forEach(product => sum += product.proteinAndFatEquivalent * product.amount / 100);
                    return sum;
                })(),
            });
        }

        if (this.state.sent && meal.isLoading)
            message.loading("Zapisywanie w toku");
        else if (this.state.sent && meal.isError)
            message.error("Coś poszło nie tak");
        else if (this.state.sent && !meal.isLoading && !meal.isError) {
            message.success('Poprawnie edytowano produkt');
            this.props.history.push(`/meals/${this.state.mealId}`);
        }
    }

    handleInfiniteOnLoad = () => {
        const {list, currentPage, totalElements, isLast} = this.props.products;
        const {searched} = this.state;
        const {searchProductsInfinity, fetchProductsInfinity} = this.props;
        const {searchValue, pageSize} = this.state;
        this.setState({loading: true});

        if (Object.values(list).length >= totalElements && isLast) {
            this.setState({loading: false});
            return;
        }
        searched ? searchProductsInfinity(searchValue, currentPage + 1, pageSize) : fetchProductsInfinity(currentPage + 1, pageSize);
        this.setState({loading: false});
    };

    clickOnProduct = (product) => {
        if (!_.some(this.state.products, (e) => e.id === product.id))
            this.setState({modalVisible: true, productToAdd: product});
        else
            message.warning("Posiłek nie może zawierać drugiego identycznego produktu")
    };

    onClickDeleteProduct = (product) => {
        this.setState({
            products: _.filter(this.state.products, (p) => p.id !== product.id),
            protein: this.state.protein - product.protein * product.amount / 100,
            carbohydrate: this.state.carbohydrate - product.carbohydrate * product.amount / 100,
            fat: this.state.fat - product.fat * product.amount / 100,
            fibre: this.state.fibre - product.fibre * product.amount / 100,
            kcal: this.state.kcal - product.kcal * product.amount / 100,
            carbohydrateExchange: this.state.carbohydrateExchange - product.carbohydrateExchange * product.amount / 100,
            proteinAndFatEquivalent: this.state.proteinAndFatEquivalent - product.proteinAndFatEquivalent * product.amount / 100,
        });
        message.success("Usunięto " + product.name);
    };

    clickOnSaveButton = () => {
        const {meal} = this.props;
        if (this.state.products)
            meal.products = this.state.products;
        this.props.editMeal(meal.id, meal);
        this.setState({sent: true});
    };

    renderCollapse = () => {
        const {list, isLast} = this.props.products;
        const {loading} = this.state;

        return (
            <div className="infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && !isLast}
                    useWindow={false}
                >
                    <List
                        dataSource={Object.values(list)}
                        renderItem={item => (
                            <Tooltip placement="bottom" title='Kliknij aby dodać' arrowPointAtCenter='true' mouseEnterDelay={0.6}>
                                <Item key={item.id} onClick={() => this.clickOnProduct(item)} className='edit__search--item'>
                                    <Item.Meta
                                        avatar={<Avatar src={item.imageUrl}/>}
                                        title={item.name}
                                    />
                                    <Link to={`/products/${item.id}`}>Zobacz</Link>
                                </Item>
                            </Tooltip>
                        )}
                    >
                        {loading && !isLast && (
                            <div className="loading-container">
                                <Spin/>
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        )
    };

    render() {
        if (!this.state.isLoggedIn)
            return <NoAuthAlert/>;
        if (!this.props.meal)
            return LOADING_SPIN;

        const {meal} = this.props;
        const {searchValue, pageSize} = this.state;

        return (
            <div className='addProducts__content'>
                <div className='addProducts__head'>
                    <h1><label>Dodawanie produktów do posiłku</label></h1>
                </div>
                <div className='addProducts__body'>
                    <div className='addProducts__firstPanel'>
                        <h2><Link to={`/meals/${meal.id}`}>{meal.name}</Link></h2>
                        <div className='show__meal-info'>
                            <h2><label>Informacje o posiłku</label></h2>
                            <table className='table-info'>
                                <thead>
                                <tr>
                                    <th><label>Nazwa</label></th>
                                    <th><label>Wartość</label></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className='table-info__row'>
                                    <td><label>Białko</label></td>
                                    <td><label>{Math.round(this.state.protein * 10) / 10}g</label></td>
                                </tr>
                                <tr className='table-info__row'>
                                    <td><label>Węglowodany</label></td>
                                    <td><label>{Math.round(this.state.carbohydrate * 10) / 10}g</label></td>
                                </tr>
                                <tr className='table-info__row'>
                                    <td><label>Tłuszcz</label></td>
                                    <td><label>{Math.round(this.state.fat * 10) / 10}g</label></td>
                                </tr>
                                <tr className='table-info__row'>
                                    <td><label>Błonnik</label></td>
                                    <td><label>{Math.round(this.state.fibre * 10) / 10}g</label></td>
                                </tr>
                                <tr className='table-info__row'>
                                    <td><label>Kcal</label></td>
                                    <td><label>{Math.round(this.state.kcal)}</label></td>
                                </tr>
                                <tr className='table-info__row'>
                                    <td><label>WW</label></td>
                                    <td><label>{this.state.carbohydrateExchange.toFixed(2)}</label></td>
                                </tr>
                                <tr className='table-info__row'>
                                    <td><label>WBT</label></td>
                                    <td><label>{this.state.proteinAndFatEquivalent.toFixed(2)}</label></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='addProducts__products'>
                            <Table
                                locale={{emptyText: 'Brak produktów'}}
                                title={() => <h3><label>Produkty w porcji</label></h3>}
                                bordered={true}
                                pagination={false}
                                rowKey='id'
                                columns={[{
                                    title: 'Nazwa', dataIndex: 'name',
                                    render: (text, record) => <Link to={`/products/${record.id}`}>{text}</Link>
                                }, {
                                    title: 'Waga',
                                    dataIndex: 'amount',
                                    width: '16%',
                                    render: (text) => `${text} g`
                                }, {
                                    title: '',
                                    dataIndex: 'id',
                                    width: '10%',
                                    render: (text, product,) =>
                                        <Button type='danger' onClick={() => this.onClickDeleteProduct(product)}>Usuń</Button>
                                }]} dataSource={this.state.products} size="default"/>
                        </div>
                    </div>
                    <Modal
                        title={<label>Ile gram produktu chcesz dodać ?</label>}
                        visible={this.state.modalVisible}
                        onOk={() => {
                            const {productToAdd} = this.state;
                            this.setState({products: [...this.state.products, productToAdd]});
                            this.setState({
                                productToAdd: {},
                                modalVisible: false,
                                protein: this.state.protein + productToAdd.protein * productToAdd.amount / 100,
                                carbohydrate: this.state.carbohydrate + productToAdd.carbohydrate * productToAdd.amount / 100,
                                fat: this.state.fat + productToAdd.fat * productToAdd.amount / 100,
                                fibre: this.state.fibre + productToAdd.fibre * productToAdd.amount / 100,
                                kcal: this.state.kcal + productToAdd.kcal * productToAdd.amount / 100,
                                carbohydrateExchange: this.state.carbohydrateExchange + productToAdd.carbohydrateExchange * productToAdd.amount / 100,
                                proteinAndFatEquivalent: this.state.proteinAndFatEquivalent + productToAdd.proteinAndFatEquivalent * productToAdd.amount / 100,
                            });
                            message.success("Dodano produkt");

                        }}
                        onCancel={() => this.setState({modalVisible: false})}
                    >
                        <InputNumber min={0} value={this.state.productToAdd.amount} onChange={(value) => {
                            this.setState({
                                productToAdd: {...this.state.productToAdd, amount: value}
                            })
                            ;
                        }}/> <label>[g]</label>

                    </Modal>
                    <div className='addProducts_secondPanel'>
                        <Search
                            placeholder="Wyszukaj produkt"
                            onSearch={searchValue => {
                                this.props.searchProducts(searchValue, 0, pageSize);
                                this.setState({
                                    searched: true
                                });
                            }}
                            onChange={(e) => this.setState({searchValue: e.target.value})}
                            value={searchValue}
                            enterButton
                            size="large"
                            className='search'
                        />
                        {this.renderCollapse()}
                    </div>
                </div>
                <Button onClick={this.clickOnSaveButton} type='primary' size='large' className='saveButton'>
                    Zapisz zmiany
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({meals, products}) => {
    return {
        meal: meals.selectedMeal,
        products: products.allProducts
    }
};

export default connect(mapStateToProps, {
    fetchMeal,
    fetchProductsInfinity,
    searchProducts,
    searchProductsInfinity,
    setMenuItem,
    editMeal
})(MealEdit);