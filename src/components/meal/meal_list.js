import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input} from 'antd';

import {fetchMeals, searchMeals, setMenuItem} from "../../actions";
import './css/meal_list.css';
import {LOADING_SPIN} from "../../helpers/messages";
import ShowMealList from "../common/show_meal_list";


class MealList extends Component {
    state = {
        searched: false,
        searchValue: '',
        pageSize: 5
    };

    componentDidMount() {
        this.props.setMenuItem('meal-list');
        this.props.fetchMeals(0, this.state.pageSize);
    }

    onChange = page => {
        const {searched, searchValue, pageSize} = this.state;
        searched ? this.props.searchMeals(searchValue, page - 1, pageSize) : this.props.fetchMeals(page - 1, pageSize);
    };

    render() {
        const {Search} = Input;
        const {searchValue, pageSize} = this.state;

        return (
            <div className='content'>
                <div className='content__wrap--mealList'>
                    <div className='header'>
                        <h1>Lista wszystkich posiłków</h1>
                        <Search
                            placeholder="Search meals"
                            onSearch={value => {
                                this.props.searchMeals(value, 0, pageSize);
                                this.setState({
                                    searched: true
                                });
                            }}
                            onChange={e => this.setState({searchValue: e.target.value})}
                            value={searchValue}
                            enterButton
                            size="large"
                        />
                    </div>
                    <div className='meal-list'>
                        {Object.keys(this.props.meals.content).length === 0 ? LOADING_SPIN :
                            <ShowMealList meals={this.props.meals} onChange={this.onChange}/>}
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