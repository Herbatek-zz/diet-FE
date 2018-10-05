import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import {Layout} from 'antd';

import Footer from './components/common/footer';
import Header from './components/common/header';
import Dashboard from './components/dashboard';
import ProductShow from './components/product/product_show';
import ProductCreate from './components/product/product_create';
import ProductList from './components/product/product_list';
import ProductMyList from './components/product/product_my_list';
import MealList from './components/meal/meal_list';
import MealShow from './components/meal/meal_show';
import MealMyList from './components/meal/meal_my_list';
import MealCreate from './components/meal/meal_create';
import MealEdit from './components/meal/meal_edit';
import MealFavourite from './components/meal/meal_favourite';
import reducers from './reducers';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Layout>
                <Header/>
                <Switch>
                    <Route path='/meals/favourite' component={MealFavourite} />
                    <Route path='/meals/:id/edit' component={MealEdit}/>
                    <Route path='/meals/my' component={MealMyList}/>
                    <Route path='/meals/new' component={MealCreate}/>
                    <Route path='/meals/:id' component={MealShow}/>
                    <Route path='/meals' component={MealList}/>
                    <Route path='/products/my' component={ProductMyList}/>
                    <Route path='/products/new' component={ProductCreate}/>
                    <Route path='/products/:id' component={ProductShow}/>
                    <Route path='/products' component={ProductList}/>
                    <Route path='/' component={Dashboard}/>
                </Switch>
                <Footer/>
            </Layout>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));
