import React, {Component} from 'react';
import {Carousel} from 'antd';

import './dashboard.css';
import AuthService from "../helpers/auth_service";
import MealTop from './meal/meal_top';
import MealLatest from "./meal/meal_latest";

class Dashboard extends Component {

    render() {
        return (
            <div className='dashboard__container'>
                <Carousel autoplay>
                    <div>
                        <h2>{AuthService.isLogged() ? 'Witaj ' + AuthService.getDecodedToken().username + ' na stronie głównej naszej aplikacji'
                            : 'Witaj, aby się zalogować, klikając przycisk po prawej stronie na pasku nawigacji - zostaniesz przekierowany na facebooka'}</h2>
                    </div>
                    <div><h2>Koszyk służy służy do zaplanowania posiłków - każdego dnia zostanie wygenerowany dla Ciebie nowy
                        koszyk, który
                        możesz uzupełnić</h2></div>
                    <div><h2>Zalogowani użytkownicy mają możliwość dodawania produktów, posiłków, tworzenia listy ulubionych</h2>
                        <h2>produktów oraz zaplanowania posiłków dodające je do koszyka</h2></div>
                    <div><h2>Uzupełnij swój profil, aby dowiedzieć się o swoim zapotrzebowaniu kalorycznym</h2></div>
                </Carousel>
                <div className='dashboard__lists-wrapper'>
                    <div className='dashboard__lists-wrapper--list'>
                        <h2 className='dashboard__lists-wrapper--title'>Najbardzije lubiane posiłki</h2>
                        <MealTop/>
                    </div>
                    <div className='dashboard__lists-wrapper--list'>
                        <h2 className='dashboard__lists-wrapper--title'>Ostatnio utworzone posiłki</h2>
                        <MealLatest/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
