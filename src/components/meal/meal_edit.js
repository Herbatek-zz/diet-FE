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
import MealInfo from './common/meal_info';
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
        amount: 0
    };

    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchMeal(id)
            .then(() => this.setState({
                name: this.props.meal.name,
                description: this.props.meal.description,
                recipe: this.props.meal.recipe,
                products: this.props.meal.products
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
        if (!_.some(this.state.products, product))
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
        this.setState({products: _.filter(this.state.products, (p) => p.id !== product.id)});
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
        const {meal} = this.props;
        const {Search} = Input;
        const {searchValue, pageSize} = this.state;
        const {content} = this.props.products;

        if (!meal)
            return LOADING_SPIN;

        return (
            <div className='content'>
                <div className='content__mealEdit'>
                    <div className='head'>
                        <Input value={this.state.name ? this.state.name : meal.name}
                               onChange={(e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className='body'>
                        <div className='edit__leftPanel'>
                            <div className='edit__mealProducts'>
                                <h2>Produkty</h2>
                                {_.map(this.state.products, product =>
                                    <Tag key={product.id} style={{marginBottom: '5px'}} closable
                                         onClose={() => this.onCloseTag(product)}>
                                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                                    </Tag>
                                )}
                            </div>
                            <div className='leftPanel__bottom'>
                                <div className='leftPanel__bottom--left'>
                                    <div className='edit__imageContainer'>
                                        <img src={meal.imageUrl} alt={meal.name} className='edit__imageContainer--image'/>
                                    </div>
                                    <div className='edit__mealInfo'>
                                        <MealInfo meal={meal}/>
                                    </div>
                                </div>
                                <div className='leftPanel__bottom--right'>
                                    <div className='edit__mealDescription'>
                                        <h2>Opis</h2>
                                        <TextArea
                                            value={this.state.description ? this.state.description : meal.description}
                                            onChange={(e) => this.setState({description: e.target.value})}
                                            rows={6}/>
                                    </div>
                                    <div className='edit__mealRecipe'>
                                        <h2>Przepis</h2>
                                        <TextArea value={this.state.recipe ? this.state.recipe : meal.recipe}
                                                  onChange={(e) => this.setState({recipe: e.target.value})}
                                                  rows={6}/>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={this.clickOnSaveButton}>Zapisz zmiany</Button>
                        </div>
                        <Modal
                            title="Basic Modal"
                            visible={this.state.modalVisible}
                            onOk={() => {
                                const {productToAdd} = this.state;
                                productToAdd.amount = this.state.amount;
                                this.setState({products: [...this.state.products, productToAdd]});
                                this.setState({productToAdd: {}, modalVisible: false, amount: 0});
                                message.success("Dodano produkt");

                            }}
                            onCancel={() => this.setState({modalVisible: false})}
                        >
                            <InputNumber min={0} max={900} value={this.state.amount} onChange={(value) => {
                                this.setState({amount: value});
                            }}/>

                        </Modal>
                        <div className='edit__rightPanel'>
                            <Search
                                placeholder="Szukaj produktów"
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
                </div>
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