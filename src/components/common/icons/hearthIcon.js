import {Icon, Tooltip, message} from "antd";
import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {addMealToFavourites, isFavouriteMeal, removeMealFromFavourites} from "../../../actions/index";
import './icons.css'

class HearthIcon extends Component {

    componentDidMount() {
        this.props.isFavouriteMeal(this.props.mealId);
    }

    render() {
        if (this.props.isFavourite)
            return (
                <Tooltip placement="topLeft" title='Usuń z ulubionych' arrowPointAtCenter='true'>
                    <span className='header-icon' onClick={() => this.props.removeMealFromFavourites(this.props.mealId,
                        () => message.error("Nie udało się usunąć posiłku z ulubionych - odśwież i spróbuj ponownie"))}>
                        <Icon type="heart" theme="filled" twoToneColor="#eb2f96" style={{color: '#eb2f96'}}/>
                        Ulubione
                    </span>
                </Tooltip>);
        else if(this.props.isActual)
            return (
                <Tooltip placement="topLeft" title='Dodaj do ulubionych' arrowPointAtCenter='true'>
                    <span className='header-icon' onClick={() => this.props.addMealToFavourites(this.props.mealId,
                        () => message.error("Nie udało się dodać posiłku do ulubionych - odśwież stronę i spróbuj ponownie"))}>
                        <Icon type="heart" theme="outlined" twoToneColor="#eb2f96" style={{color: '#eb2f96'}}/>
                        Ulubione
                    </span>
                </Tooltip>);
        return null;
    }
}

const mapStateToProps = ({meals}) => {
    return {
        isFavourite: meals.isFavourite
    }
};

export default connect(mapStateToProps, {
    isFavouriteMeal, addMealToFavourites, removeMealFromFavourites,
})(HearthIcon);