import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, message, Upload, Icon} from 'antd';
import {TextField, TextAreaField} from 'redux-form-antd';

import AuthService from '../../helpers/auth_service';
import {createMeal, setMenuItem} from "../../actions";
import {NO_LOGGED_MESSAGE} from '../../helpers/messages';
import '../common/form.css';
import {NECESSARY_FIELD} from "../../helpers/constants";


class MealCreate extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        imageFile: []
    };

    componentDidMount() {
        this.props.setMenuItem('meal-create');
    }

    onSubmit = (values) => {
        if (!this.state.imageFile[0])
            message.error("Musisz wybrać obrazek");
        else {
            values.image = this.state.imageFile[0];
            this.props.createMeal(values, (mealId) => {
                this.props.history.push(`/meals/${mealId}/add-products`);
                message.success('Poprawnie stworzono posiłek');
            });
        }
    };

    render() {
        if (!this.state.isLoggedIn)
            return <div className='content__list'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='form-container'>
                <div className='form-container__wrapper'>
                    <h1 className='form-container__title'><label>Dodaj nowy posiłek</label></h1>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='form' autoComplete='off'>
                        <Field
                            name='name'
                            component={TextField}
                            addonBefore={<label>Nazwa</label>}
                            placeholder='Nazwa'/>
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

                        <Upload
                            name='image'
                            className='form__upload-btn'
                            action={(image) => {
                                this.setState({imageFile: [image]});
                                this.event.preventDefault();
                            }}
                            onRemove={() => this.setState({imageFile: []})}
                            fileList={this.state.imageFile}
                            showUploadList={true}
                            accept='.jpg, .jpeg, .png' supportServerRender={true}>
                            <Button htmlType='button'>
                                <Icon type="upload"/> Wczytaj zdjęcie
                            </Button>
                        </Upload>

                        <Button className='form__button' type="primary" ghost htmlType='submit'>Zatwierdź</Button>
                    </form>
                </div>
            </div>
        )
    }

}

function validate({name, description, recipe}) {
    const errors = {};

    if (!name || !name.trim())
        errors.name = NECESSARY_FIELD;
    else if (name.length < 2 || name.length > 60)
        errors.name = 'Nazwa musi mieć więcej niż 2 znaki, a mniej niż 60 znaków';

    if (!description || !description.trim())
        errors.description = NECESSARY_FIELD;
    else if (description.length < 10 || description.length > 3000)
        errors.description = "Opis może zawierać od 10 do 3000 znaków";

    if (!recipe || !recipe.trim())
        errors.recipe = NECESSARY_FIELD;
    else if (recipe.length < 10 || recipe.length > 3000)
        errors.recipe = "Przepis może zawierać od 10 do 3000 znaków";

    return errors;
}

export default reduxForm({
    validate,
    form: 'MealNewForm'
})(
    connect(null, {createMeal, setMenuItem})(MealCreate)
);