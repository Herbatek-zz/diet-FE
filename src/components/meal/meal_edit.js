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
import MealDescription from './common_components/meal_description';
import MealRecipe from './common_components/meal_recipe';
import MealInfo from './common_components/meal_info';
import EditMealProducts from "./common_components/edit_meal_products";
import './css/meal_edit.css';


const searchProductSize = 12;

class MealEdit extends Component {
    state = {
        searched: false,
        value: '',
        loading: false
    };

    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchMeal(id);
        this.props.fetchProducts(0, searchProductSize);
    }

    handleInfiniteOnLoad = () => {
        const {content, currentPage, totalElements, last} = this.props.products;
        const {searched} = this.state;
        const {searchProductsInfinity, fetchProductsInfinity} = this.props;
        const {value} = this.state;
        this.setState({loading: true});

        if (Object.values(content).length >= totalElements && last) {
            this.setState({loading: false});
            return;
        }
        searched ? searchProductsInfinity(value, currentPage + 1, searchProductSize) : fetchProductsInfinity(currentPage + 1, searchProductSize);
        this.setState({loading: false});
    };

    renderCollapse = () => {
        const {content, last} = this.props.products;
        const {Item} = List;
        const {loading} = this.state;

        return (
            <div className="infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && !last}
                    useWindow={false}
                >
                    <List
                        dataSource={Object.values(content)}
                        renderItem={item => (
                            <Tooltip placement="bottom" title='Click to add' arrowPointAtCenter='true' mouseEnterDelay='0.6'>
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
                        {loading && !last && (
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
        const {value} = this.state;
        const {content} = this.props.products;

        if (!meal)
            return (
                <div className='content loading-spin'>
                    <Spin size='large'/>
                </div>
            );

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
                                onSearch={value => {
                                    this.props.searchProducts(value, 0, searchProductSize);
                                    this.setState({
                                        searched: true
                                    });
                                }}
                                onChange={(e) => this.setState({value: e.target.value})}
                                value={value}
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