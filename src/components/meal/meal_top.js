import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchTopMeals} from "../../actions";

import './meal_show.css';
import _ from "lodash";
import {Link} from "react-router-dom";

class MealTop extends Component {

    componentDidMount() {
        this.props.fetchTopMeals();
    }

    render() {
        return(
            <ol>
                {_.map(this.props.topMeals, meal =>
                    <li key={meal.id}>
                        <Link to={`/meals/${meal.id}`}><b>{meal.name}</b></Link>
                    </li>
                )}
            </ol>
        )
    }

}

const mapStateToProps = ({meals}) => {
    return {
        topMeals: meals.top
    }
};

export default connect(mapStateToProps, {fetchTopMeals})(MealTop);