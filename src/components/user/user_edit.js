import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, message} from 'antd';
import {NumberField, TextField} from 'redux-form-antd';

import AuthService from '../../helpers/auth_service';
import {editUser, fetchUser, setMenuItem, fetchUserFromCookie} from "../../actions";
import {NO_LOGGED_MESSAGE} from '../../helpers/messages';
import '../common/form.css';
import {NECESSARY_FIELD} from "../../helpers/constants";

class UserEdit extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
    };

    componentDidMount() {
        this.props.setMenuItem('');

        if (this.state.isLoggedIn)
            this.props.fetchUser(AuthService.getDecodedToken().sub)
                .then(() => {
                    const {user} = this.props;
                    this.props.initialize({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        picture_url: user.picture_url,
                        age: user.age,
                        height: user.height,
                        weight: user.weight
                    });
                })
    }

    onSubmit = (values) =>
        this.props.editUser(values, () => {
            this.props.fetchUserFromCookie();
            this.props.history.push(`/user/${this.props.user.id}`);
            message.success('Poprawnie zaktualizowano profil');
        });


    render() {
        if (!this.state.isLoggedIn)
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='content__mealCreate'>
                <div className='form__container'>
                    <h1 className='form__title'><label>Edycja profilu</label></h1>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='form' autoComplete='off'>
                        <Field
                            name='username'
                            component={TextField}
                            addonBefore={<label>Nazwa użytkownika</label>}
                            placeholder='Nazwa użytkownika'
                        />
                        <Field
                            name='firstName'
                            component={TextField}
                            addonBefore={<label>Imię</label>}
                            placeholder='Imię'/>
                        <Field
                            name='lastName'
                            component={TextField}
                            addonBefore={<label>Nazwisko</label>}
                            placeholder='Nazwisko'/>
                        <Field
                            name='email'
                            component={TextField}
                            addonBefore={<label>Email</label>}
                            placeholder='Email'/>
                        <Field
                            name='picture_url'
                            component={TextField}
                            addonBefore={<label>Link do avatara</label>}
                            placeholder='Link do zdjęcia'/>
                        <div className='form__numberItem'>
                            <label className='form__numberItem--label'>Wiek</label>
                            <Field
                                name='age'
                                component={NumberField}
                                step={1}/>
                        </div>
                        <div className='form__numberItem'>
                            <label className='form__numberItem--label'>Wzrost</label>
                            <Field
                                name='height'
                                component={NumberField}
                                step={1}/>
                        </div>
                        <div className='form__numberItem'>
                            <label className='form__numberItem--label'>Waga</label>
                            <Field
                                name='weight'
                                component={NumberField}
                                step={1}/>
                        </div>
                        <Button className='form__button' type="primary" ghost htmlType='submit'>Submit</Button>
                    </form>
                </div>
            </div>
        )
    }

}

function validate({username, firstName, lastName, email, picture_url, age, height, weight}) {
    const errors = {};

    if (!username || !username.trim())
        errors.username = NECESSARY_FIELD;
    else if (username.length > 15)
        errors.username = 'Nazwa użytkownika może mieć maksymalnie 15 znaków';

    if (!firstName || !firstName.trim())
        errors.firstName = NECESSARY_FIELD;
    else if (firstName.length > 35)
        errors.firstName = 'Imię może mieć maksymalnie 35 znaków';

    if (!lastName || !lastName.trim())
        errors.lastName = NECESSARY_FIELD;
    else if (lastName.length > 35)
        errors.lastName = 'Nazwisko może mieć maksymalnie 35 znaków';

    if (!picture_url || !picture_url.trim())
        errors.picture_url = 'Musisz podać link do avatara';

    if (!email || !email.trim())
        errors.email = NECESSARY_FIELD;
    else if (email.length < 4 || email.length > 254)
        errors.email = 'Email może mieć od 4 do 254 znaków';

    if (!age && age !== 0)
        errors.age = NECESSARY_FIELD;
    else if (age < 0)
        errors.age = 'Nie możesz ustawić ujemnego wieku';
    else if (age > 140)
        errors.age = 'Maksymalny wiek to 140 lat';
    else if (isNaN(age))
        errors.age = "Wiek musi być liczbą";

    if (!height && height !== 0)
        errors.height = NECESSARY_FIELD;
    else if (height < 0)
        errors.height = 'Nie możesz mieć ujemnego wzrostu';
    else if (height > 250)
        errors.height = 'Maksymalny wzrost to 250cm';
    else if (isNaN(height))
        errors.height = "Wzrost musi być liczbą";

    if (!weight && weight !== 0)
        errors.weight = NECESSARY_FIELD;
    else if (weight < 0)
        errors.weight = 'Waga nie może być ujemna';
    else if (weight > 1000)
        errors.weight = 'Maksymalna waga to 450kg';
    else if (isNaN(weight))
        errors.weight = "Waga musi być liczbą";

    return errors;
}

const mapStateToProps = ({user}) => {
    return {
        user
    }
};

export default reduxForm({
    validate,
    form: 'UserEditForm'
})(
    connect(mapStateToProps, {fetchUser, editUser, setMenuItem, fetchUserFromCookie})(UserEdit)
);