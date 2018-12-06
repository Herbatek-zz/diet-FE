import React, {Component} from 'react';
import HearthIcon from "../../common/icons/hearthIcon";
import AddToCartIcon from "../../common/icons/addToCartIcon";
import AuthService from "../../../helpers/auth_service";
import EditIcon from "../../common/icons/editIcon";
import DeleteIcon from "../../common/icons/deleteIcon";
import {addMealToCart, deleteMeal} from "../../../actions";
import {InputNumber, Modal} from "antd";
import connect from "react-redux/es/connect/connect";

class MealMenu extends Component {
    state = {
        modalVisible: false,
        amount: null,
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addMealToCart(this.props.mealId, new Date(), this.state.amount);
        this.setState({modalVisible: false})
    };

    modal = () => {
        return (
            <Modal
                title={<label>Ile gram posiłku chcesz dodać do koszyka?</label>}
                visible={this.state.modalVisible}
                onOk={this.onSubmit}
                onCancel={() => this.setState({modalVisible: false})}
            >
                <form className='form' onSubmit={this.onSubmit} autoComplete='off'>
                    <InputNumber
                        min={0}
                        autoFocus
                        value={this.state.amount}
                        onChange={value => this.setState({amount: value})}
                    />
                </form>
            </Modal>
        )
    };

    renderWhenUserIsAuthor = () => {
        const {mealId, onDelete} = this.props;
        return (
            <div className='meal-show__menu'>
                <HearthIcon mealId={mealId}/>
                <AddToCartIcon onClick={() => this.setState({modalVisible: true})}/>
                <EditIcon link={`/meals/${mealId}/edit`}/>
                <EditIcon link={`/meals/${mealId}/add-products`} text='Edytuj produkty'/>
                <DeleteIcon
                    confirmText='Czy na pewno chcesz usunąć ten posiłek ?'
                    onDelete={() => deleteMeal(mealId, onDelete)}/>
                {this.modal()}
            </div>
        )
    };

    renderWhenOtherUser = () => {
        return (
            <div className='meal-show__menu'>
                <HearthIcon mealId={this.props.mealId}/>
                <AddToCartIcon onClick={() => this.setState({modalVisible: true})}/>
                {this.modal()}
            </div>
        )
    };

    render() {
        const {userId} = this.props;
        return userId === AuthService.getDecodedToken().sub ? this.renderWhenUserIsAuthor() : this.renderWhenOtherUser()
    }
}

export default connect(null, {addMealToCart, deleteMeal})(MealMenu);