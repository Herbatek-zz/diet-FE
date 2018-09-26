import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchProducts, setMenuItem, fetchMeal} from "../../actions";
import MealList from "./meal_list";
import {EditHeader, EditBody, LeftPanel, RightPanel} from "./meal_edit_style";
import MealDescription from "./common_components/meal_description";
import {Spin} from "antd";

class MealEdit extends Component {

    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchMeal(id);
    }

    render() {
        const {meal} = this.props;

        if (!meal)
            return (
                <div className='content loading-spin'>
                    <Spin size='large'/>
                </div>
            );

        return (
            <div className='content'>
                <EditHeader>
                    <h1>Meal edit</h1>
                </EditHeader>
                <EditBody>
                    <LeftPanel>
                        <MealDescription description={meal.description}/>
                    </LeftPanel>
                    <RightPanel>
                        <MealList/>
                    </RightPanel>
                </EditBody>
            </div>
        );
    }
}

const mapStateToProps = ({meals}, ownProps) => {
    return {
        meal: meals.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchMeal, setMenuItem})(MealEdit);