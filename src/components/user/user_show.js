import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setMenuItem, fetchUser} from "../../actions";
import {LOADING_SPIN} from "../../helpers/messages";
import AuthService from "../../helpers/auth_service";
import EditIcon from './../common/icons/editIcon';
import './user_show.css';


class UserShow extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        productId: this.props.match.params.id,
        modalVisible: false,
        amount: 0
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchUser(this.state.productId);
    }

    render() {
        const {user} = this.props;

        if (!user)
            return LOADING_SPIN;

        return (
            <div className='user-show__container'>
                <div className='user-show__body'>
                    <div className='user-show__image-container'>
                        <img src={user.picture_url} alt='avatar' className='user-show__image-container--image'/>
                    </div>
                    <div>
                        <label>Nazwa użytkownika:</label><b>{user.username}</b>
                    </div>
                    <div>
                        <label>Imie:</label> <b>{user.firstName}</b>
                    </div>
                    <div>
                        <label>Nazwisko:</label> <b>{user.lastName}</b>
                    </div>
                    <div>
                        <label>Email:</label> <b>{user.email}</b>
                    </div>
                    <div>
                        <label>Wiek:</label> <b>{user.age === 0 ? 'Brak informacji' : user.age}</b>
                    </div>
                    <div>
                        <label>Wzrost:</label> <b>{user.height === 0 ? 'Brak informacji' : user.height + ' cm'} </b>
                    </div>
                    <div>
                        Waga: <b>{user.weight === 0 ? 'Brak informacji' : user.weight + ' kg'}</b>
                    </div>
                    <div>
                        Dzienne zapotrzebowanie kaloryczne: <b>{user.caloriesPerDay === 0 ? 'Brak informacji' : user.caloriesPerDay + ' kcal'}</b>
                    </div>
                </div>
                {AuthService.isLogged() && AuthService.getDecodedToken().sub === user.id ?
                    <div className='user-show__edit-icon'>
                        <EditIcon link={'/user/edit'} text='Edytuj profil' className='user-show__edit-icon'/>
                    </div> : ''}
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {
        user
    }
};

export default connect(mapStateToProps, {setMenuItem, fetchUser})(UserShow);