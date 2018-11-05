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
                    <div><h2>{this.state.isLoggedIn ? 'Witaj' + AuthService.getDecodedToken().username : 'Witaj, możesz zalogować się przez facebooka, klikając przycisk po prawej stronie na pasku nawigacji'}</h2></div>
                    <div><h2>Koszyk służy służy do codziennego dodawania posiłków - codziennie zostanie wygenerowany nowy koszyk, który możesz uzupełnić</h2></div>
                    <div><h2>Zalogowani użytkownicy mają możliwość dodawania produktów, posiłków, tworzenia listy ulubionych produktów oraz dodawania produktów do koszyka</h2></div>
                    <div><h2>Uzupełnij swój profil, by dowiedzieć się o swoim zapotrzebowaniu kalorycznym</h2></div>
                </Carousel>
            </div>
        );
    }
}

export default Dashboard;
