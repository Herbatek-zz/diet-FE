import React, {Component} from 'react';
import {Carousel} from 'antd';

import './dashboard.css';
import AuthService from "../helpers/auth_service";
import MealTop from './meal/meal_top';
import MealLatest from "./meal/meal_latest";

class Dashboard extends Component {

    render() {
        return (
            <div className='dashboard'>
                <Carousel autoplay className='carousel'>
                    <div className='carousel__item'>
                        <p className='carousel__text'>{AuthService.isLogged() ? 'Witaj ' + AuthService.getDecodedToken().username + ' na stronie głównej naszej aplikacji'
                            : 'Witaj, aby się zalogować, klikając przycisk po prawej stronie na pasku nawigacji - zostaniesz przekierowany na facebooka.'}</p>
                    </div>
                    <div className='carousel__item'>
                        <p className='carousel__text'>Koszyk służy służy do zaplanowania posiłków - każdego dnia zostanie
                            wygenerowany dla Ciebie nowy koszyk, który możesz uzupełnić.
                        </p>
                    </div>
                    <div className='carousel__item'>
                        <p className='carousel__text'>Zalogowani użytkownicy mają możliwość dodawania produktów, posiłków,
                            tworzenia listy ulubionych produktów oraz zaplanowania posiłków dodające je do koszyka.</p>
                    </div>
                    <div className='carousel__item'>
                        <p className='carousel__text'>Uzupełnij swój profil, aby dowiedzieć się o swoim zapotrzebowaniu
                            kalorycznym.</p>
                    </div>
                </Carousel>
                <div className='dashboard-list'>
                    <div className='dashboard-list__wrapper'>
                        <h2 className='dashboard-list__title'>Najbardzije lubiane posiłki</h2>
                        <MealTop/>
                    </div>
                    <div className='dashboard-list__wrapper'>
                        <h2 className='dashboard-list__title'>Ostatnio utworzone posiłki</h2>
                        <MealLatest/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Dashboard;
