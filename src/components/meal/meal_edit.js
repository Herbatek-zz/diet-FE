import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Button, message} from 'antd';
import {TextField, TextAreaField} from 'redux-form-antd';

import AuthService from '../../helpers/auth_service';
import {fetchMeal, editMeal, setMenuItem} from "../../actions";
import {NO_LOGGED_MESSAGE} from '../../helpers/messages';
import '../common/form.css';
import {NECESSARY_FIELD} from "../../helpers/constants";

class MealEdit extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        mealId: this.props.match.params.id
    };

    componentDidMount() {
        this.props.setMenuItem('-');
        if (this.state.isLoggedIn)
            this.props.fetchMeal(this.state.mealId)
                .then(() => {
                    const {meal} = this.props;
                    this.props.initialize({
                        name: meal.name,
                        imageUrl: meal.imageUrl,
                        description: meal.description,
                        recipe: meal.recipe
                    });
                })
    }

    onSubmit = (values) => {
        this.props.editMeal(this.state.mealId, values, () => {
            this.props.history.push(`/meals/${this.state.mealId}`);
            message.success('Poprawnie edytowano produkt');
        });
    };

    render() {
        if (!this.state.isLoggedIn)
            return <div className='content'>{NO_LOGGED_MESSAGE}</div>;

        return (
            <div className='content__mealCreate'>
                <div className='form__container'>
                    <h1 className='form__title'><label>Edytuj posiłek</label></h1>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='form' autoComplete='off'>
                        <Field
                            name='name'
                            component={TextField}
                            addonBefore={<label>Nazwa</label>}
                            placeholder='Nazwa'/>
                        <Field
                            name='imageUrl'
                            component={TextField}
                            addonBefore={<label>Zdjęcie posiłku</label>}
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
                        <Button className='form__button' type="primary" ghost htmlType='submit'>Zatwierdź</Button>
                    </form>
                </div>
            </div>
        )
    }

}

function validate({name, imageUrl, description, recipe}) {
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

    if (!recipe || !recipe.trim())
        errors.recipe = NECESSARY_FIELD;
    else if (recipe.length < 10 || recipe.length > 3000)
        errors.recipe = "Przepis może zawierać od 10 do 3000 znaków";

    return errors;
}

const mapStateToProps = ({meals}, ownProps) => {
    return {
        meal: meals.content[ownProps.match.params.id]
    }
};

export default reduxForm({
    validate,
    form: 'MealEditForm'
})(
    connect(mapStateToProps, {editMeal, fetchMeal, setMenuItem})(MealEdit)
);