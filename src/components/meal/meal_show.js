import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMeal, setMenuItem, addMealToCart, deleteMeal} from "../../actions";
import AuthService from "../../helpers/auth_service";
import './meal_show.css';
import {LOADING_SPIN} from "../../helpers/messages";
import HearthIcon from '../common/icons/hearthIcon';
import AddToCartIcon from '../common/icons/addToCartIcon';
import EditIcon from '../common/icons/editIcon';
import DeleteIcon from '../common/icons/deleteIcon';
import ItemInfoTable from '../common/item-info-table';
import {InputNumber, Modal, message, Table} from "antd";
import {Link} from "react-router-dom";


class MealShow extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        mealId: this.props.match.params.id,
        modalVisible: false,
        amount: 0
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchMeal(this.state.mealId, () => message.error("Nie odnaleziono produktu"));
    }

    render() {
        const {meal} = this.props;
        const {mealId, isLoggedIn, amount} = this.state;

        if (!meal)
            return LOADING_SPIN;

        return (
            <div className='meal-show'>
                <div className='meal-show__head'>
                    <h1 className='meal-show__title'><label>{meal.name}</label></h1>
                    {isLoggedIn ?
                        <div className='meal-show__menu'>
                            <HearthIcon mealId={mealId}/>
                            <AddToCartIcon onClick={() => this.setState({modalVisible: true})}/>
                            {meal.userId === AuthService.getDecodedToken().sub ? <EditIcon link={`/meals/${mealId}/edit`}/> : ''}
                            {meal.userId === AuthService.getDecodedToken().sub ? <EditIcon link={`/meals/${mealId}/add-products`} text='Edytuj produkty'/> : ''}
                            {meal.userId === AuthService.getDecodedToken().sub ?
                                <DeleteIcon confirmText='Czy na pewno chcesz usunąć ten posiłek ?'
                                            onDelete={() => deleteMeal(this.state.mealId, () => this.props.history.push('/meals/my'))}/> : ''}
                        </div> : ''}

                    <Modal
                        title="Wpisz ilość posiłku [g]"
                        visible={this.state.modalVisible}
                        onOk={() => {
                            this.props.addMealToCart(mealId, new Date(), amount);
                            this.setState({modalVisible: false})
                        }}
                        onCancel={() => this.setState({modalVisible: false})}
                    >
                        <InputNumber min={0} value={this.state.amount} onChange={(value) => {
                            this.setState({amount: value})
                        }}/>

                    </Modal>
                </div>
                <div className='meal-show__body'>
                    <div className='meal-show__first-panel'>
                        <div className='first-panel__image-container'>
                            <img src={meal.imageUrl} alt={meal.name} className='first-panel__image'/>
                        </div>
                        <div className='first-panel__info'>
                            <h2>Informacje o posiłku</h2>
                            <ItemInfoTable item={meal}/>
                        </div>
                    </div>
                    <div className='meal-show__second-panel'>
                        <div className='second-panel__meal-products'>
                            <Table
                                locale={{emptyText: 'Brak produktów'}}
                                title={() => <h3><label>Produkty na porcję</label></h3>}
                                bordered={true}
                                pagination={false}
                                rowKey='id'
                                columns={[{
                                    title: 'Nazwa', dataIndex: 'name',
                                    render: (text, record) => <Link to={`/products/${record.id}`}>{text}</Link>
                                }, {
                                    title: 'Waga',
                                    dataIndex: 'amount',
                                    render: (text) => `${text} g`
                                }
                                ]} dataSource={meal.products} size="default"/>
                        </div>
                        <div className='second-panel__description'>
                            <h2>Opis</h2>
                            <p className='second-panel__description-text'>{meal.description}</p>
                        </div>
                        <div className='second-panel__recipe'>
                            <h2>Przepis</h2>
                            <p className='second-panel__recipe-text'>{meal.recipe}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({meals}, ownProps) => {
    return {
        meal: meals.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchMeal, setMenuItem, addMealToCart, deleteMeal})(MealShow);