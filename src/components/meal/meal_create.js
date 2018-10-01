import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, message} from 'antd';
import {TextField, TextAreaField} from 'redux-form-antd';

import AuthService from '../../helpers/auth_service';
import {createMeal, setMenuItem} from "../../actions";
import {NO_LOGIN_MESSAGE} from '../../helpers/messages';
import '../default/form.css';

class MealCreate extends Component {
    componentDidMount() {
        this.props.setMenuItem('meal-create');
    }

    onSubmit = (values) => {
        this.props.createMeal(values, () => {
            this.props.reset();
            message.success('Meal has been created');
        });
    };

    renderForm = () => {
        const {handleSubmit} = this.props;
        return (
            <div className='meal-create__contentWrap'>
                <h1 className='meal-create__title'>Create a new meal</h1>
                <form onSubmit={handleSubmit(this.onSubmit)} className='form'>
                    <Field
                        name='name'
                        component={TextField}
                        placeholder='Name'/>
                    <Field
                        name='imageUrl'
                        component={TextField}
                        placeholder='Image'/>
                    <Field
                        name='description'
                        rows={4}
                        component={TextAreaField}
                        placeholder='Description'/>
                    <Field
                        name='recipe'
                        rows={6}
                        component={TextAreaField}
                        placeholder='Recipe'/>
                    <Button className='form__button' type="primary" ghost htmlType='submit'>Submit</Button>
                </form>
            </div>
        )
    };

    render() {
        return (
            <div className='content'>
                {AuthService.isLogged() ? this.renderForm() : NO_LOGIN_MESSAGE}
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