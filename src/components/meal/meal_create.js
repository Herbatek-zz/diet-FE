import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, message} from 'antd';
import {TextField, TextAreaField} from 'redux-form-antd';

import AuthService from '../../helpers/auth_service';
import {createMeal, setMenuItem} from "../../actions";
import {NO_LOGGED_MESSAGE} from '../../helpers/messages';
import '../common/css/form.css';

class MealCreate extends Component {
    state = {
        isLoggedIn: AuthService.isLogged()
    };

    componentDidMount() {
        this.props.setMenuItem('meal-create');
    }

    onSubmit = (values) => {
        this.props.createMeal(values, () => {
            this.props.reset();
            message.success('Poprawnie stworzono posiłek');
        });
    };

    render() {
        if (!this.state.isLoggedIn)
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='content'>
                <div className='content__mealCreate'>
                    <h1 className='mealCreate__title'>Tworzenie nowego posiłku</h1>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='form' autoComplete='off'>
                        <Field
                            name='name'
                            component={TextField}
                            placeholder='Nazwa'/>
                        <Field
                            name='imageUrl'
                            component={TextField}
                            placeholder='Link do zdjęcia'/>
                        <Field
                            name='description'
                            rows={4}
                            component={TextAreaField}
                            placeholder='Opis'/>
                        <Field
                            name='recipe'
                            rows={6}
                            component={TextAreaField}
                            placeholder='Przepis'/>
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

export default reduxForm({
    validate,
    form: 'MealNewForm'
})(
    connect(null, {createMeal, setMenuItem})(MealCreate)
);