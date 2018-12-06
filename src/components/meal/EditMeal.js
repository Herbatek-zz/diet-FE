import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Alert, Button, Icon, message, Upload} from 'antd';
import {TextField, TextAreaField} from 'redux-form-antd';

import AuthService from '../../helpers/auth_service';
import {fetchMeal, editMeal, setMenuItem} from "../../actions";
import '../common/form.css';
import {NECESSARY_FIELD} from "../../helpers/constants";
import NoAuthAlert from "../common/NoAuthAlert";
import {LOADING_SPIN} from "../../helpers/messages";

class MealEdit extends Component {
    state = {
        sent: false,
        isLoggedIn: AuthService.isLogged(),
        mealId: this.props.match.params.id,
        imageFile: []
    };

    componentDidMount() {
        this.props.setMenuItem('-');
        if (this.state.isLoggedIn)
            this.props.fetchMeal(this.state.mealId)
                .then(() => {
                    const {meal} = this.props;
                    this.props.initialize({
                        name: meal.name,
                        description: meal.description,
                        recipe: meal.recipe,
                        products: meal.products
                    });
                })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {meal} = this.props;
        if (this.state.sent && meal.isLoading)
            message.loading("Zapisywanie w toku");
        else if (this.state.sent && meal.isError)
            message.error("Coś poszło nie tak");
        else if (this.state.sent && !meal.isLoading && !meal.isError) {
            message.success('Poprawnie edytowano produkt');
            this.props.history.push(`/meals/${this.state.mealId}`);
        }
    }

    onSubmit = (values) => {
        values.image = this.state.imageFile[0];
        this.props.editMeal(this.state.mealId, values);
        this.setState({sent: true});
    };

    render() {
        const {meal} = this.props;
        if (!this.state.isLoggedIn)
            return <NoAuthAlert/>;

        if (!meal || meal.isLoading)
            return LOADING_SPIN;

        if(meal.isError)
            return <Alert
                message="Błąd"
                style={{width: '80%', marginTop: '1%'}}
                description="Niestety nie udało nam się znaleźć tego posiłku."
                type="error"
                showIcon
            />;

        return (
            <div className='form-container'>
                <div className='form-container__wrapper'>
                    <h1 className='form-container__title'><label>Edytuj posiłek</label></h1>
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

const mapStateToProps = ({meals}) => {
    return {
        meal: meals.selectedMeal
    }
};

const formWrapped = reduxForm({
    validate,
    form: 'EditMealForm'
})(MealEdit);

export default connect(mapStateToProps, {editMeal, fetchMeal, setMenuItem})(formWrapped);