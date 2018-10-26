import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Avatar, Input, Spin, Tooltip, Button, message, Tag, Modal, InputNumber} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from "react-router-dom";
import {
    fetchMeal,
    fetchProducts,
    fetchProductsInfinity,
    searchProducts,
    searchProductsInfinity,
    editMeal,
    setMenuItem
} from "../../actions";
import './css/meal_edit.css';
import AuthService from "../../helpers/auth_service";
import {LOADING_SPIN} from "../../helpers/messages";
import _ from "lodash";

const {TextArea} = Input;

class MealEdit extends Component {
    state = {
        modalVisible: false,
        searched: false,
        searchValue: '',
        loading: false,
        isLoggedIn: AuthService.isLogged(),
        pageSize: 12,
        name: '',
        description: '',
        recipe: '',
        products: [],
        productToAdd: {},
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        fibre: 0,
        kcal: 0,
        carbohydrateExchange: 0,
        proteinAndFatEquivalent: 0
    };

    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchMeal(id)
            .then(() => this.setState({
                name: this.props.meal.name,
                description: this.props.meal.description,
                recipe: this.props.meal.recipe,
                products: this.props.meal.products,
                protein: this.props.meal.protein,
                carbohydrate: this.props.meal.carbohydrate,
                fat: this.props.meal.fat,
                fibre: this.props.meal.fibre,
                kcal: this.props.meal.kcal,
                carbohydrateExchange: this.props.meal.carbohydrateExchange,
                proteinAndFatEquivalent: this.props.meal.proteinAndFatEquivalent
            }));
        this.props.fetchProducts(0, this.state.pageSize);
    }

    handleInfiniteOnLoad = () => {
        const {content, currentPage, totalElements, isLast} = this.props.products;
        const {searched} = this.state;
        const {searchProductsInfinity, fetchProductsInfinity} = this.props;
        const {searchValue, pageSize} = this.state;
        this.setState({loading: true});

        if (Object.values(content).length >= totalElements && isLast) {
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

    clickOnSaveButton = () => {
        const {meal} = this.props;
        if (this.state.name)
            meal.name = this.state.name;
        if (this.state.description)
            meal.description = this.state.description;
        if (this.state.recipe)
            meal.recipe = this.state.recipe;
        if (this.state.products)
            meal.products = this.state.products;
        this.props.editMeal(meal, () => {
            this.props.history.push(`/meals/${meal.id}`);
            message.success("Poprawnie zapisano")
        });
    };

    onCloseTag = (product) => {
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

    renderCollapse = () => {
        const {content, isLast} = this.props.products;
        const {Item} = List;
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
                        dataSource={Object.values(content)}
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
        if (!this.props.meal)
            return LOADING_SPIN;

        const {meal} = this.props;
        const {Search} = Input;
        const {searchValue, pageSize, name} = this.state;
        const {content} = this.props.products;

        return (
            <div className='editMeal__content'>
                <div className='editMeal__head'>
                    <Input value={name ? name : meal.name}
                           onChange={(e) => this.setState({name: e.target.value})}
                           className='editMeal__head--name'/>
                </div>
                <div className='editMeal__body'>
                    <div className='editMeal__displayMeal'>
                        <div className='editMeal__displayMeal--first'>
                            <div className='editMeal__imageContainer'>
                                <img src={meal.imageUrl} alt={meal.name} className='editMeal__imageContainer--image'/>
                            </div>
                            <div className='editMeal__info--core'>
                                <h2>Informacje o posiłku</h2>
                                <h4>Białko: {Math.round(this.state.protein)}</h4>
                                <h4>Węglowodany: {Math.round(this.state.carbohydrate)}</h4>
                                <h4>Tłuszcz: {Math.round(this.state.fat)}</h4>
                                <h4>Błonnik: {Math.round(this.state.fibre)}</h4>
                                <h4>Kcal: {Math.round(this.state.kcal)}</h4>
                                <h4>WW: {this.state.carbohydrateExchange.toFixed(2)}</h4>
                                <h4>WBT: {this.state.proteinAndFatEquivalent.toFixed(2)}</h4>
                            </div>
                        </div>
                        <div className='editMeal__displayMeal--second'>
                            <div className='editMeal__description'>
                                <h2>Opis</h2>
                                <TextArea
                                    value={this.state.description ? this.state.description : meal.description}
                                    onChange={(e) => this.setState({description: e.target.value})}
                                    rows={6}/>
                            </div>
                            <div className='editMeal__recipe'>
                                <h2>Przepis</h2>
                                <TextArea value={this.state.recipe ? this.state.recipe : meal.recipe}
                                          onChange={(e) => this.setState({recipe: e.target.value})}
                                          rows={6}/>
                            </div>
                        </div>
                    </div>
                    <Modal
                        title="Wpisz ilość produktu [g]"
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
                        <InputNumber min={0} max={900} value={this.state.productToAdd.amount} onChange={(value) => {
                            this.setState({
                                productToAdd: {...this.state.productToAdd, amount: value}
                            })
                            ;
                        }}/>

                    </Modal>
                    <div className='editMeal_searchProducts'>
                        <div className='editMeal__products'>
                            <h2>Produkty</h2>
                            {_.map(this.state.products, product =>
                                <Tag key={product.id} style={{marginBottom: '5px'}} closable
                                     onClose={() => this.onCloseTag(product)}>
                                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                                </Tag>
                            )}
                        </div>
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
                        {!content ? <div className='content loading-spin'><Spin size='large'/></div> : this.renderCollapse()}

                    </div>
                </div>
                <Button onClick={this.clickOnSaveButton} type='primary' size='large' className='saveButton'>Zapisz zmiany</Button>
            </div>
        );
    }
}

const mapStateToProps = ({meals, products}, ownProps) => {
    return {
        meal: meals.content[ownProps.match.params.id],
        products
    }
};

export default connect(mapStateToProps, {
    fetchMeal,
    fetchProducts,
    fetchProductsInfinity,
    searchProducts,
    searchProductsInfinity,
    setMenuItem,
    editMeal
})(MealEdit);