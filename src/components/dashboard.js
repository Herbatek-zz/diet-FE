import React, {Component} from 'react';
import {Carousel} from 'antd';

import './dashboard.css';
import AuthService from "../helpers/auth_service";

class Dashboard extends Component {

    render() {
        return (
            <div className='dashboard__container'>
                <Carousel autoplay>
                    <div>
                        <h2>{AuthService.isLogged() ? 'Witaj ' + AuthService.getDecodedToken().username + ' na stronie głównej naszej aplikacji'
                            : 'Witaj, aby się zalogować, klikając przycisk po prawej stronie na pasku nawigacji - zostaniesz przekierowany na facebooka'}</h2>
                    </div>
                    <div><h2>Koszyk służy służy do zaplanowania posiłków - każdego dnia zostanie wygenerowany dla Ciebie nowy koszyk, który
                        możesz uzupełnić</h2></div>
                    <div><h2>Zalogowani użytkownicy mają możliwość dodawania produktów, posiłków, tworzenia listy ulubionych</h2>
                        <h2>produktów oraz zaplanowania posiłków dodające je do koszyka</h2></div>
                    <div><h2>Uzupełnij swój profil, aby dowiedzieć się o swoim zapotrzebowaniu kalorycznym</h2></div>
                </Carousel>
                <div className='article'>
                    <h1>Cele aplikacji</h1>
                    <div className='article__content'>
                        <p>
                            Aplikacja ma za zadanie udostępnić możliwość łatwego oraz przejrzystego gromadzenia przepisów kulinarnych,
                            planowania codziennej diety, śledzenia ilości spożytych kalorii oraz makroskładników.
                            Tworząc nowy posiłek mamy możliwość dodania przepisu oraz opisu, po utworzeniu powinniśmy dodać
                            potrzebne produkty w wymaganej ilości, które są niezbędne do sporządzenia dania – na tej podstawie
                            obliczone zostaną informacje o posiłku. <br/>
                            Aby w pełni korzystać z możliwości koszyka, użytkownik powinien uzupełnić informacje takie jak:
                            <b>wiek</b>, <b>waga</b>, <b>wzrost</b>, <b>aktywność fizyczna</b> oraz <b>płeć</b>. Wszystkie wymienione
                            informacje można uzupełnić edytując swój profil. Aby edytować profil wystarczy najechać kursorem myszki
                            na obrazek profilowy w menu nawigacyjnym, następnie z rozwijanego menu wybrać <b>profil</b>. Na następnej
                            podstronie kliknąć przycisk <b>edycja profilu</b>.<br/>


                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
