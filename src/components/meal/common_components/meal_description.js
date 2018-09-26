import React, {Component} from 'react';
import styled from "styled-components";

const Description = styled.div `
    border 1px solid rgba(87, 87, 87, 0.2);
    border-radius: 5px;
    min-height: 30%;
    padding 10px;
    margin-bottom: 10px;
`;

class MealDescription extends Component {
    render() {

        const {description} = this.props;

        return (
            <Description>
                <h2>Description</h2>
                <h4>{description}</h4>
            </Description>
        )
    }
}

export default MealDescription;