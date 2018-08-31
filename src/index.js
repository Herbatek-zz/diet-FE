import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import Dashboard from './components/dashboard';
import ProductShow from './components/product/product_show';
import ProductCreate from './components/product/product_create';
import ProductList from './components/product/product_list';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/products/new' component={ProductCreate}/>
                    <Route path='/products/:id' component={ProductShow}/>
                    <Route path='/products' component={ProductList}/>
                    <Route path='/' component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));
