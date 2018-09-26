import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Collapse} from 'antd';

import {fetchMeals, setMenuItem} from "../../actions";


class MealList extends Component {
    componentDidMount() {
        this.props.setMenuItem('meal-list');
        this.props.fetchMeals(0);
    }

    renderMeals = () => {
        const {content} = this.props.meals;
        const {Panel} = Collapse;

        return _.map(content, meal =>
            <Panel
                className='collapse__item'
                key={meal.id}
                header={
                    <div>
                        <h3>{meal.name}</h3>
                        <Link to={`/meals/${meal.id}`}> More</Link>
                    </div>}>
                <p>Description: {meal.description}</p>
                <p>Calories: {meal.kcal}</p>
                <img src={meal.imageUrl} alt='meal'/>
            </Panel>
        );
    };

    onChange = (page) => {
        this.props.fetchMeals(page - 1);
    };

    render() {
        const {currentPage, totalElements} = this.props.meals;

        return (
            <div className='content'>
                <h1>Meals</h1>
                <Collapse className='collapse'>
                    {this.renderMeals()}
                </Collapse>,
                <Pagination current={currentPage + 1} total={totalElements} onChange={this.onChange}/>
            </div>
        );
    }
}

const mapStateToProps = ({meals}) => {
    return {
        meals
    }
};

export default connect(mapStateToProps, {fetchMeals, setMenuItem})(MealList);