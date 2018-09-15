import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchProducts, setMenuItem} from "../../actions";
import '../product/product_list.css';
import MealList from "./meal_list";

class MealEdit extends Component {

    componentWillMount() {
        this.props.setMenuItem('');
        console.log(this.props)
    }

    render() {
        return (
            <div className='content'>
                <MealList/>
            </div>
        );
    }
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
};

export default connect(mapStateToProps, {fetchProducts, setMenuItem})(MealEdit);