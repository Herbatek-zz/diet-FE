import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input} from 'antd';

import {fetchMeals, searchMeals, setMenuItem} from "../../actions";
import '../common/list.css';
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
            <div className='content__list'>
                <div className='header'>
                    <h1 className='header__title'><label>Lista posiłków</label></h1>
                    <Search
                        placeholder="Wyszukaj posiłek"
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
                <div className='list'>
                    {Object.keys(this.props.meals.content).length === 0 ? LOADING_SPIN :
                        <ShowMealList meals={this.props.meals} onChange={this.onChange}/>}
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