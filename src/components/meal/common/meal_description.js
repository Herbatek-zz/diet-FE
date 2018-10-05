import React, {Component} from 'react';


class MealDescription extends Component {
    render() {

        const {description} = this.props;

        return (
            <div>
                <h2>Description</h2>
                <h4 className='description'>{description}</h4>
            </div>
        )
    }
}

export default MealDescription;