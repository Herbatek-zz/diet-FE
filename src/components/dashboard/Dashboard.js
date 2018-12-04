import React, {Component} from 'react';
import {Carousel} from 'antd';

import AuthService from "../../helpers/auth_service";
import MealTop from './ListTopMeals';
import MealLatest from "./ListLatestMeals";
import './Dashboard.css';
import {DASHBOARD_TEXT_1, DASHBOARD_TEXT_2, DASHBOARD_TEXT_3} from "../../helpers/constants";

class Dashboard extends Component {

    render() {
        return (
            <div className='dashboard'>
                <Carousel autoplay className='carousel'>
                    <div className='carousel__item'>
                        <p className='carousel__text'>{AuthService.isLogged() ?
                            'Witaj ' + AuthService.getDecodedToken().username + ' na stronie głównej naszej aplikacji' :
                            'Witaj, aby się zalogować, klikając przycisk po prawej stronie na pasku nawigacji - zostaniesz przekierowany na facebooka.'}
                        </p>
                    </div>
                    <div className='carousel__item'>
                        <p className='carousel__text'>{DASHBOARD_TEXT_1}</p>
                    </div>
                    <div className='carousel__item'>
                        <p className='carousel__text'>{DASHBOARD_TEXT_2}</p>
                    </div>
                    <div className='carousel__item'>
                        <p className='carousel__text'>{DASHBOARD_TEXT_3}</p>
                    </div>
                </Carousel>
                <div className='dashboard-lists'>
                    <MealTop/>
                    <MealLatest/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
