import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextField, TextAreaField, NumberField} from 'redux-form-antd'
import {connect} from 'react-redux';
import {Button, message} from 'antd';

import AuthService from '../../helpers/auth_service';
import {createProduct, setMenuItem} from "../../actions";
import {NO_LOGIN_MESSAGE} from "../../helpers/messages";
import '../common/css/form.css';


class ProductCreate extends Component {
    state = {
        isLoggedIn: AuthService.isLogged()
    };

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

    render() {
        if (!this.state.isLoggedIn)
            return <div className='content'>{NO_LOGIN_MESSAGE}</div>;

        return (
            <div className='content'>
                <h1>Create a new product</h1>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='form' autoComplete='off'>
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
                    <div className='form__numberItem'>
                        <label className='form__numberItem--label'>Protein:</label>
                        <Field
                            name='protein'
                            component={NumberField}
                            min={0}
                            max={100}
                            step={0.1}/>
                    </div>
                    <div className='form__numberItem'>
                        <label className='form__numberItem--label'>Carbohydrate:</label>
                        <Field
                            name='carbohydrate'
                            component={NumberField}
                            min={0}
                            max={100}
                            step={0.1}/>
                    </div>
                    <div className='form__numberItem'>
                        <label className='form__numberItem--label'>Fat:</label>
                        <Field
                            name='fat'
                            component={NumberField}
                            min={0}
                            max={100}
                            step={0.1}/>
                    </div>
                    <div className='form__numberItem'>
                        <label className='form__numberItem--label'>Fibre:</label>
                        <Field
                            name='fibre'
                            component={NumberField}
                            min={0}
                            max={100}
                            step={0.1}/>
                    </div>
                    <div className='form__numberItem'>
                        <label className='form__numberItem--label'>Kcal:</label>
                        <Field
                            name='kcal'
                            component={NumberField}
                            min={0}
                            max={900}
                            step={1}/>
                    </div>
                    <Button className='form__button' type="primary" ghost htmlType='submit'>Submit</Button>
                </form>
            </div>
        );
    }

    onSubmit = (values) => {
        this.props.createProduct(values, () => {
            this.props.reset();
            message.success('Product has been created');
        });
    };

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