import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextField, TextAreaField, NumberField} from 'redux-form-antd'
import {connect} from 'react-redux';
import {Button, message} from 'antd';

import AuthService from '../../helpers/auth_service';
import {createProduct, setMenuItem} from "../../actions";
import {NO_LOGGED_MESSAGE} from "../../helpers/messages";
import '../common/form.css';
import {NECESSARY_FIELD} from "../../helpers/constants";


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
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='content__productCreate'>
                <div className='form__container'>
                    <h1 className='form__title'><label>Dodaj produkt</label></h1>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='form' autoComplete='off'>
                        <Field
                            name='name'
                            component={TextField}
                            addonBefore={<label>Nazwa</label>}
                            placeholder='Nazwa'/>
                        <Field
                            name='imageUrl'
                            component={TextField}
                            addonBefore={<label>Zdjęcie produktu</label>}
                            placeholder='Link do zdjęcia'/>
                        <Field
                            name='description'
                            rows={4}
                            component={TextAreaField}
                            placeholder='Opis'/>
                        <div>
                            <label>Makroskładniki oraz pozostałe informacje w <b>100g</b> produktu</label>
                            <div className='form__numberItem'>
                                <label className='form__numberItem--label'>Białko:</label>
                                <Field
                                    name='protein'
                                    component={NumberField}
                                    step={0.1}/>
                            </div>
                            <div className='form__numberItem'>
                                <label className='form__numberItem--label'>Węglowodany</label>
                                <Field
                                    name='carbohydrate'
                                    component={NumberField}
                                    step={0.1}/>
                            </div>
                            <div className='form__numberItem'>
                                <label className='form__numberItem--label'>Tłuszcz</label>
                                <Field
                                    name='fat'
                                    component={NumberField}
                                    step={0.1}/>
                            </div>
                            <div className='form__numberItem'>
                                <label className='form__numberItem--label'>Błonnik</label>
                                <Field
                                    name='fibre'
                                    component={NumberField}
                                    step={0.1}/>
                            </div>
                            <div className='form__numberItem'>
                                <label className='form__numberItem--label'>Kcal</label>
                                <Field
                                    name='kcal'
                                    component={NumberField}
                                    step={1}/>
                            </div>
                        </div>
                        <Button className='form__button' type="primary" ghost htmlType='submit'>Submit</Button>
                    </form>
                </div>
            </div>
        );
    }

    onSubmit = (values) => {
        this.props.createProduct(values, () => {
            this.props.reset();
            message.success('Poprawnie stworzono produkt');
        });
    };

}

function validate({name, imageUrl, description, protein, carbohydrate, fat, fibre, kcal}) {
    const errors = {};

    if (!name || !name.trim())
        errors.name = NECESSARY_FIELD;
    else if (name.length < 2 || name.length > 60)
        errors.name = 'Nazwa musi mieć więcej niż 2 znaki, a mniej niż 60 znaków';

    if (!imageUrl || !imageUrl.trim())
        errors.imageUrl = NECESSARY_FIELD;

    if (!description || !description.trim())
        errors.description = NECESSARY_FIELD;
    else if (description.length < 10 || description.length > 3000)
        errors.description = "Opis może zawierać od 10 do 3000 znaków";

    if (!protein && protein !== 0)
        errors.protein = NECESSARY_FIELD;
    else if (protein < 0)
        errors.protein = 'Wartość białka nie może być ujemna';
    else if (protein > 100)
        errors.protein = 'Wartość białka nie może być większa niż 100';
    else if (isNaN(protein))
        errors.protein = "Wartość białka musi wyrażać się liczbą";

    if (!carbohydrate && carbohydrate !== 0)
        errors.carbohydrate = NECESSARY_FIELD;
    else if (carbohydrate < 0)
        errors.carbohydrate = 'Wartość węglowodanów nie może być ujemna';
    else if (carbohydrate > 100)
        errors.carbohydrate = 'Wartość węglowodanów nie może być większa niż 100';
    else if (isNaN(carbohydrate))
        errors.carbohydrate = "Wartość węglowodanów musi wyrażać się liczbą";

    if (!fat && fat !== 0)
        errors.fat = NECESSARY_FIELD;
    else if (fat < 0)
        errors.fat = 'Wartość tłuszczu nie może być ujemna';
    else if (fat > 100)
        errors.fat = 'Wartość tłuszczu nie może być większa niż 100';
    else if (isNaN(fat))
        errors.fat = "Wartość tłuszczu musi wyrażać się liczbą";

    if (!fibre && fibre !== 0)
        errors.fibre = NECESSARY_FIELD;
    else if (fibre < 0)
        errors.fibre = 'Wartość błonnika nie może być ujemna';
    else if (fibre > 100)
        errors.fibre = 'Wartość błonnika nie może być większa niż 100';
    else if (isNaN(fibre))
        errors.fibre = "Wartość błonnika musi wyrażać się liczbą";

    if (!kcal && kcal !== 0)
        errors.kcal = NECESSARY_FIELD;
    else if (kcal < 0)
        errors.kcal = 'Produkt nie może mieć mniej niż 0 kalorii';
    else if (kcal > 1000)
        errors.kcal = 'Wartość kalorii nie może być większa niż 1000';
    else if (isNaN(kcal))
        errors.kcal = "Wartość kalorii musi wyrażać się liczbą";

    return errors;
}

export default reduxForm({
    validate,
    form: 'ProductNewForm'
})(
    connect(null, {createProduct, setMenuItem})(ProductCreate)
);