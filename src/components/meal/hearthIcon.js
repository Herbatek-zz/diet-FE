import {Icon, Tooltip} from "antd";
import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {
    addMealToFavourites,
    isFavouriteMeal,
    removeMealFromFavourites
} from "../../actions";

class HearthIcon extends Component {

    componentDidMount() {
        this.props.isFavouriteMeal(this.props.mealId);
    }

    render() {
        if (this.props.isFavourite)
            return (
                <Tooltip placement="top" title='Remove from favourites' arrowPointAtCenter='true'>
                    <span className='head__span' onClick={() => this.props.removeMealFromFavourites(this.props.mealId)}>
                        <Icon type="heart" theme="filled" twoToneColor="#eb2f96" style={{fontSize: '30px', color: '#eb2f96'}}/>
                        Ulubione
                    </span>
                </Tooltip>);
        else
            return (
                <Tooltip placement="top" title='Add to favourites' arrowPointAtCenter='true'>
                    <span className='head__span' onClick={() => this.props.addMealToFavourites(this.props.mealId)}>
                        <Icon type="heart" theme="outlined" twoToneColor="#eb2f96" style={{fontSize: '30px', color: '#eb2f96'}}/>
                        Ulubione
                    </span>
                </Tooltip>);
    }
}

const mapStateToProps = ({meals}) => {
    return {
        isFavourite: meals.isFavourite
    }
};

export default connect(mapStateToProps, {
    isFavouriteMeal,
    addMealToFavourites,
    removeMealFromFavourites,
})(HearthIcon);