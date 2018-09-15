import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextField, TextAreaField, NumberField} from 'redux-form-antd'
import {connect} from 'react-redux';
import {Button} from 'antd';

import AuthService from '../../helpers/auth_service';
import {createProduct, setMenuItem} from "../../actions";
import {NO_LOGIN_MESSAGE} from "../../helpers/messages";
import './product_create.css';

class ProductCreate extends Component {
    componentWillMount() {
        this.props.setMenuItem('product-create');

        this.props.initialize({
            protein: 0,
            carbohydrate: 0,
            fat: 0,
            fibre: 0,
            kcal: 0
        });
    }


    onSubmit = (values) => {
        this.props.createProduct(values, () => {
            alert("Poprawnie stworzono produkt");
        });
    };

    renderForm = () => {
        const {handleSubmit} = this.props;

        return (

            <form onSubmit={handleSubmit(this.onSubmit)} className='form' autoComplete='off'>

                <Field name='name' label="Name" component={TextField}/>
                <Field name='description' label="Description" component={TextAreaField}/>
                <Field name='imageUrl' label="Image" component={TextField}/>
                <Field name='protein' label="Protein" component={NumberField}/>
                <Field name='carbohydrate' label="Carbohydrate" component={NumberField}/>
                <Field name='fat' label="Fat" component={NumberField}/>
                <Field name='fibre' label="Fibre" component={NumberField}/>
                <Field name='kcal' label="Calories" component={NumberField}/>
                <Button type="primary" ghost htmlType='submit'>Submit</Button>

            </form>
        )
    };

    render() {
        return (
            <div className='content'>
                {AuthService.isLogged() ? this.renderForm() : NO_LOGIN_MESSAGE}
            </div>
        );
    }

}

function validate({name, imageUrl, protein, carbohydrate, fat, fibre, kcal}) {
    const errors = {};

    if (!name)
        errors.name = 'Product has to have a name';
    else if (!name.trim())
        errors.name = 'Product name cannot be empty';
    else if (name.trim().length < 2 || name.trim().length > 80)
        errors.name = 'Product name length has to be between 2 and 80 characters';

    if (!imageUrl)
        errors.imageUrl = 'You have to add a link';

    if (!protein && protein !== 0)
        errors.protein = 'Protein has to have a value';
    else if (protein < 0)
        errors.protein = 'Protein cannot be lower than 0';

    if (!carbohydrate && carbohydrate !== 0)
        errors.carbohydrate = 'Carbohydrate has to have a value';
    else if (carbohydrate < 0)
        errors.carbohydrate = 'Carbohydrate cannot be lower than 0';

    if (!fat && fat !== 0)
        errors.fat = 'Fat has to have a value';
    else if (fat < 0)
        errors.fat = 'Fat cannot be lower than 0';

    if (!fibre && fibre !== 0)
        errors.fibre = 'Fibre has to have a value';
    else if (fibre < 0)
        errors.fibre = 'Fibre cannot be lower than 0';

    if (!kcal && kcal !== 0)
        errors.kcal = 'Kcal has to have a value';
    else if (kcal < 0)
        errors.kcal = 'Kcal cannot be lower than 0';


    return errors;
}

export default reduxForm({
    validate,
    form: 'ProductNewForm'
})(
    connect(null, {createProduct, setMenuItem})(ProductCreate)
);