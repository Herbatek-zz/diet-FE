import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Avatar, Input, Spin, Tooltip} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from "react-router-dom";

import {
    fetchMeal,
    fetchProducts,
    fetchProductsInfinity,
    searchProducts,
    searchProductsInfinity,
    setMenuItem
} from "../../actions";
import MealDescription from './common/meal_description';
import MealRecipe from './common/meal_recipe';
import MealInfo from './common/meal_info';
import EditMealProducts from "./common/edit_meal_products";
import './css/meal_edit.css';
import AuthService from "../../helpers/auth_service";
import {SHOW_LOADING_SPIN} from "../../helpers/messages";


class MealEdit extends Component {
    state = {
        searched: false,
        searchValue: '',
        loading: false,
        isLoggedIn: AuthService.isLogged(),
        pageSize: 12
    };

    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchMeal(id);
        this.props.fetchProducts(0, this.state.pageSize);
        console.log(this.props)
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
                            <Tooltip placement="bottom" title='Click to add' arrowPointAtCenter='true' mouseEnterDelay={0.6}>
                                <Item key={item.id} onClick={() => console.log("działam")} className='edit__search--item'>
                                    <Item.Meta
                                        avatar={<Avatar src={item.imageUrl}/>}
                                        title={item.name}
                                    />
                                    <Link to={`/products/${item.id}`}>See more</Link>
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
            return SHOW_LOADING_SPIN;

        return (
            <div className='content'>
                <div className='content__wrap--edit'>
                    <div className='head'>
                        <h1 className='head__title'>Edit {meal.name}</h1>
                    </div>
                    <div className='body'>
                        <div className='edit__leftPanel'>
                            <div className='edit__mealProducts'>
                                <EditMealProducts products={meal.products}/>
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
                                        <MealDescription description={meal.description}/>
                                    </div>
                                    <div className='edit__mealRecipe'>
                                        <MealRecipe recipe={meal.recipe}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='edit__rightPanel'>
                            <Search
                                placeholder="Search products"
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
    setMenuItem
})(MealEdit);