import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchLatestMeals} from "../../actions";

import './meal_show.css';
import _ from "lodash";
import {Link} from "react-router-dom";

class MealLatest extends Component {

    componentDidMount() {
        this.props.fetchLatestMeals();
    }

    render() {
        return(
            <ol>
                {_.map(this.props.latestMeals, meal =>
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
        latestMeals: meals.latestMeals
    }
};

export default connect(mapStateToProps, {fetchLatestMeals})(MealLatest);