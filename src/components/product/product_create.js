import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, Layout} from 'antd';

import AuthService from '../../helpers/auth_service';
import {createProduct} from "../../actions";
import Header from '../default/header';
import Footer from '../default/footer';
import './product_create.css';


class ProductCreate extends Component {

    componentWillMount() {
        if (!AuthService.isLogged())
            this.props.history.replace('/');
    }

    renderTextField(field) {
        const {meta: {touched, error}} = field;
        return (
            <div>
                <label>{field.label}</label>
                <input type='text' placeholder={field.label} {...field.input}/>
                <div className='form-error'>
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderNumberField(field) {
        const {meta: {touched, error}} = field;

        return (
            <div>
                <label>{field.label}</label>
                <input type='number' {...field.input}/>
                <div className='form-error'>
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderTextArea(field) {
        const {meta: {touched, error}} = field;

        return (
            <div>
                <label>{field.label}</label>
                <textarea {...field.input}/>
                <div className='form-error'>
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createProduct(values, () => {
            this.props.history.push('/products')
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <Layout>
                <Header navSelectedItem='product-create'/>
                <div className='content'>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name='name' label='Name' component={this.renderTextField}/>
                        <Field name='description' label='Description' component={this.renderTextArea}/>
                        <Field name='imageUrl' label='Image' component={this.renderTextField}/>
                        <Field name='protein' label='Protein' component={this.renderNumberField}/>
                        <Field name='carbohydrate' label='Carbohydrate' component={this.renderNumberField}/>
                        <Field name='fat' label='Fat' component={this.renderNumberField}/>
                        <Field name='fibre' label='Fibre' component={this.renderNumberField}/>
                        <Field name='kcal' label='Calories' component={this.renderNumberField}/>
                        <Button type="primary" ghost htmlType='submit'>Submit</Button>
                    </form>
                </div>
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
    form: 'ProductNewForm'
})(
    connect(null, {createProduct})(ProductCreate)
);