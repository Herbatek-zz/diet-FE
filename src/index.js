import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import {Layout} from 'antd';

import Footer from './components/common/footer/footer';
import Header from './components/common/header/header';
import Dashboard from './components/dashboard/dashboard';
import ProductShow from './components/product/product_show';
import ProductCreate from './components/product/product_create';
import ProductList from './components/product/product_list';
import ProductMyList from './components/product/product_my_list';
import ProductEdit from './components/product/product_edit';
import MealList from './components/meal/meal_list';
import MealShow from './components/meal/meal_show';
import MealMyList from './components/meal/meal_my_list';
import MealCreate from './components/meal/meal_create';
import MealAddProducts from './components/meal/meal_add_products';
import MealEdit from './components/meal/meal_edit';
import MealFavourite from './components/meal/meal_favourite';
import ShowCart from './components/cart/show_cart';
import UserEdit from './components/user/user_edit';
import UserShow from './components/user/user_show';
import reducers from './reducers';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Layout>
                <Header/>
                <div className='content'>
                    <Switch>
                        <Route path='/user/edit' component={UserEdit}/>
                        <Route path='/user/:id' component={UserShow}/>
                        <Route path='/cart' component={ShowCart}/>
                        <Route path='/meals/favourite' component={MealFavourite}/>
                        <Route path='/meals/:id/edit' component={MealEdit}/>
                        <Route path='/meals/:id/add-products' component={MealAddProducts}/>
                        <Route path='/meals/my' component={MealMyList}/>
                        <Route path='/meals/new' component={MealCreate}/>
                        <Route path='/meals/:id' component={MealShow}/>
                        <Route path='/meals' component={MealList}/>
                        <Route path='/products/:id/edit' component={ProductEdit}/>
                        <Route path='/products/my' component={ProductMyList}/>
                        <Route path='/products/new' component={ProductCreate}/>
                        <Route path='/products/:id' component={ProductShow}/>
                        <Route path='/products' component={ProductList}/>
                        <Route path='/' component={Dashboard}/>
                    </Switch>
                </div>
                <Footer/>
            </Layout>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));
