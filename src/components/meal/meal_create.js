import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, Layout} from 'antd';

import AuthService from '../../helpers/auth_service';
import {createMeal} from "../../actions";
import Header from '../default/header';
import Footer from '../default/footer';
import {NO_LOGIN_MESSAGE} from '../../helpers/messages';


class MealCreate extends Component {

    renderInput({label, type, input, meta}) {
        const {touched, error} = meta;
        return (
            <div>
                <label>{label}</label>
                <input type={type} placeholder={label} {...input}/>
                <div className='form-error'>
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderTextArea({label, input, meta}) {
        const {touched, error} = meta;

        return (
            <div>
                <label>{label}</label>
                <textarea {...input}/>
                <div className='form-error'>
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit = (values) => {
        this.props.createMeal(values, () => {
            alert("Poprawnie stworzono posiłek");
        });
    };

    renderForm = () => {
        const {handleSubmit} = this.props;
        return (
            <div className='content'>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Field name='name' label='Name' type='text' component={this.renderInput}/>
                    <Field name='description' label='Description' component={this.renderTextArea}/>
                    <Field name='recipe' label='Recipe' component={this.renderTextArea}/>
                    <Field name='imageUrl' label='Image' type='text' component={this.renderInput}/>
                    <Field name='protein' label='Protein' type='number' component={this.renderInput}/>
                    <Field name='carbohydrate' label='Carbohydrate' type='number' component={this.renderInput}/>
                    <Field name='fat' label='Fat' type='number' component={this.renderInput}/>
                    <Field name='fibre' label='Fibre' type='number' component={this.renderInput}/>
                    <Field name='kcal' label='Calories' type='number' component={this.renderInput}/>
                    <Button type="primary" ghost htmlType='submit'>Submit</Button>
                </form>
            </div>
        )
    };

    render() {
        return (
            <Layout>
                <Header menuSelectedItem='meal-create'/>

                {AuthService.isLogged() ? this.renderForm() : NO_LOGIN_MESSAGE}

                <Footer/>
            </Layout>
        );
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
    connect(null, {createMeal})(MealCreate)
);