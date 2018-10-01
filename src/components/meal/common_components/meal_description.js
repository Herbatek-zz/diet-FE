import React, {Component} from 'react';
import styled from "styled-components";

const Description = styled.div `
    border 1px solid rgba(87, 87, 87, 0.2);
    border-radius: 5px;
    padding 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

class MealDescription extends Component {
    render() {

        const {description} = this.props;

        return (
            <Description>
                <h2>Description</h2>
                <h4 className='description'>{description}</h4>
            </Description>
        )
    }
}

export default MealDescription;