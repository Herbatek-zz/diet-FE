import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, message} from 'antd';
import {NumberField, TextField, SliderField, SelectField} from 'redux-form-antd';
import AuthService from '../../helpers/auth_service';
import {editUser, fetchUser, setMenuItem, fetchUserFromCookie} from "../../actions";
import '../common/form.css';
import {NECESSARY_FIELD} from "../../helpers/constants";
import NoAuthAlert from "../common/NoAuthAlert";

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
                        sex: user.sex,
                        activity: user.activity,
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
            message.success('Poprawnie zaktualizowano profil', 1);
        });


    render() {
        if (!this.state.isLoggedIn)
            return <NoAuthAlert/>;

        return (
            <div className='form-container'>
                <div className='form-container__wrapper'>
                    <h1 className='form-container__title'>
                        <label>Edycja profilu</label>
                    </h1>
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
                        <Field
                            name='sex'
                            component={SelectField}
                            label='Płeć'
                            placeholder="Wybierz płeć"
                            options={
                                [
                                    {label: 'Mężczyzna', value: 'MAN'},
                                    {label: 'Kobieta', value: "WOMAN"}
                                ]
                            }
                        />
                        <Field
                            name='activity'
                            component={SelectField}
                            placeholder='Wybierz aktywność fizyczną'
                            label='Aktywność fizyczna'
                            options={[
                                {
                                    label: 'Brak aktywności, praca siedząca',
                                    value: 'VERY_LOW'
                                },
                                {
                                    label: 'Niska aktywność (praca siedząca i 1-2 treningi w tygodniu)',
                                    value: 'LOW'
                                },
                                {
                                    label: 'Średnia aktywność (praca siedząca i treningi 3-4 razy w tygodniu)',
                                    value: 'AVERAGE'
                                },
                                {
                                    label: 'Wysoka aktywność (praca fizyczna i 3-4 treningi w tygodniu)',
                                    value: 'HIGH'
                                },
                                {
                                    label: 'Bardzo wysoka aktywność (zawodowi sportowcy, osoby codziennie trenujące)',
                                    value: 'VERY_HIGH'
                                }
                            ]}
                        />
                        <Field
                            label='Wiek'
                            name='age'
                            component={NumberField}
                            step={1}/>
                        <Field
                            name='height'
                            component={SliderField}
                            min={100}
                            max={220}
                            label='Wzrost'
                            marks={{
                                100: '100 cm',
                                120: '120 cm',
                                140: '140 cm',
                                160: '160 cm',
                                180: '180 cm',
                                200: '200 cm',
                                220: '220 cm'
                            }}
                            tipFormatter={(value) => value + ' cm'}/>

                        <Field
                            name='weight'
                            component={SliderField}
                            min={10}
                            max={190}
                            label='Waga'
                            marks={{
                                10: '10 kg',
                                40: '40 kg',
                                70: '70 kg',
                                100: '100 kg',
                                130: '130 kg',
                                160: '160 kg',
                                190: '190 kg'
                            }}
                            tipFormatter={(value) => value + ' kg'}/>
                        <Button className='form__button' type="primary" ghost htmlType='submit'>Zatwierdź</Button>
                    </form>
                </div>
            </div>
        )
    }

}

function validate({username, firstName, lastName, email, picture_url, sex, activity, age}) {
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

    if (!sex)
        errors.sex = NECESSARY_FIELD;

    if (!activity)
        errors.activity = NECESSARY_FIELD;

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