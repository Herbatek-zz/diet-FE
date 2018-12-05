import React from 'react';
import {Layout} from "antd";
import Header from "./common/header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './index.css';

import UserEdit from "./user/EditUser";
import UserShow from "./user/ShowUser";
import ShowCart from "./cart/ShowCart";
import MealFavourite from "./meal/ListFavouriteMeals";
import MealEdit from "./meal/EditMeal";
import MealAddProducts from "./meal/AddProductsToMeal";
import MealMyList from "./meal/MyListMeals";
import MealCreate from "./meal/CreateMeal";
import MealShow from "./meal/show-meal/ShowMeal";
import MealList from "./meal/ListMeals";
import ProductEdit from "./product/EditProduct";
import ProductMyList from "./product/MyListProducts";
import ProductCreate from "./product/CreateProduct";
import ProductShow from "./product/ShowProduct";
import ProductList from "./product/ListProducts";
import Dashboard from "./dashboard/Dashboard";
import Footer from "./common/footer/Footer";

const App = () => {
    return (
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
    );
};

export default App;