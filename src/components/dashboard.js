import React, {Component} from 'react';
import {Carousel} from 'antd';

import './dashboard.css';
import AuthService from "../helpers/auth_service";

class Dashboard extends Component {
    state = {
        isLoggedIn: AuthService.isLogged()
    };

    render() {
        return (
            <div className='dashboard__container'>
                <Carousel autoplay>
                    <div>
                        <h2>{this.state.isLoggedIn ? 'Witaj ' + AuthService.getDecodedToken().username + ' na stronie głównej naszej aplikacji'
                            : 'Witaj, aby się zalogować, klikając przycisk po prawej stronie na pasku nawigacji - zostaniesz przekierowany na facebooka'}</h2>
                    </div>
                    <div><h2>Koszyk służy służy do zaplanowania posiłków - każdego dnia zostanie wygenerowany nowy koszyk, który
                        możesz uzupełnić</h2></div>
                    <div><h2>Zalogowani użytkownicy mają możliwość dodawania produktów, posiłków, tworzenia listy ulubionych</h2>
                        <h2>produktów oraz zaplanowania posiłków dodające je do koszyka</h2></div>
                    <div><h2>Uzupełnij swój profil, aby dowiedzieć się o swoim zapotrzebowaniu kalorycznym</h2></div>
                </Carousel>
            </div>
        );
    }
}

export default Dashboard;
