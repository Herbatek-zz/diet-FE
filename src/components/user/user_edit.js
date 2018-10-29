import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, message} from 'antd';
import {NumberField, TextField} from 'redux-form-antd';

import AuthService from '../../helpers/auth_service';
import {editUser, fetchUser, setMenuItem} from "../../actions";
import {NO_LOGGED_MESSAGE} from '../../helpers/messages';
import '../common/form.css';

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

    onSubmit = (values) => {
        this.props.editUser(values, () => {
            this.props.history.push(`/user/${this.props.user.id}`);
            message.success('Poprawnie zaktualizowano profil');
        });
    };


    render() {
        if (!this.state.isLoggedIn)
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='content__mealCreate'>
                <div className='form__container'>
                    <h1 className='form__title'>Edycja profilu</h1>
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
                            <label className='form__numberItem--label'>Wiek:</label>
                            <Field
                                name='age'
                                component={NumberField}
                                min={0}
                                max={140}
                                step={1}/>
                        </div>
                        <div className='form__numberItem'>
                            <label className='form__numberItem--label'>Wzrost:</label>
                            <Field
                                name='height'
                                component={NumberField}
                                min={0}
                                max={300}
                                step={1}/>
                        </div>
                        <div className='form__numberItem'>
                            <label className='form__numberItem--label'>Waga:</label>
                            <Field
                                name='weight'
                                component={NumberField}
                                min={0}
                                max={500}
                                step={1}/>
                        </div>
                        <Button className='form__button' type="primary" ghost htmlType='submit'>Submit</Button>
                    </form>
                </div>
            </div>
        )
    }

}

function validate(values) {
    const errors = {};

    if (!values.name)
        errors.name = 'You have to enter a name of product';
    if (!values.imageUrl)
        errors.imageUrl = 'You have to add a link';
    if (values.protein < 0)
        errors.protein = 'Protein can not be lower than 0';
    if (values.carbohydrate < 0)
        errors.carbohydrate = 'Carbohydrate can not be lower than 0';
    if (values.fat < 0)
        errors.fat = 'Fat can not be lower than 0';
    if (values.fibre < 0)
        errors.fibre = 'Fibre can not be lower than 0';
    if (values.kcal < 0)
        errors.kcal = 'Kcal can not be lower than 0';

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
    connect(mapStateToProps, {fetchUser, editUser, setMenuItem})(UserEdit)
);