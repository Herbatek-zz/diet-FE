import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Collapse, Input} from 'antd';

import {fetchMeals, searchMeals, setMenuItem} from "../../actions";
import './meal_list.css';


class MealList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searched: false,
            value: ''
        }
    }

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
        const {searched, value} = this.state;
        const {fetchMeals, searchMeals} = this.props;
        searched ? searchMeals(value, page - 1) : fetchMeals(page - 1);
    };

    render() {
        const {currentPage, totalElements} = this.props.meals;
        const {Search} = Input;
        const {value} = this.state;

        return (
            <div className='content'>
                <div className='content__wrap--mealList'>
                    <div className='header'>
                        <h1>Meal list</h1>
                        <Search
                            placeholder="Search meals"
                            onSearch={value => {
                                this.props.searchMeals(value, 0);
                                this.setState({
                                    searched: true
                                });
                            }}
                            onChange={(e) => this.setState({value: e.target.value})}
                            value={value}
                            enterButton
                            size="large"
                        />
                    </div>
                    <div className='collapse-list'>
                        <Collapse>
                            {this.renderMeals()}
                        </Collapse>
                    </div>
                    <div className='pagination'>
                        <Pagination current={currentPage + 1} total={totalElements} onChange={this.onChange}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({meals}) => {
    return {
        meals
    }
};

export default connect(mapStateToProps, {fetchMeals, searchMeals, setMenuItem})(MealList);