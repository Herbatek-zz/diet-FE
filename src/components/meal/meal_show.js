import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spin, Icon} from 'antd';
import {Link} from "react-router-dom";

import {fetchMeal, setMenuItem} from "../../actions";
import AuthService from "../../helpers/auth_service";
import MealDescription from './common_components/meal_description';
import MealRecipe from './common_components/meal_recipe';
import MealInfo from './common_components/meal_info';
import MealProducts from "./common_components/meal_products";
import {
    MealHeader,
    HeaderTitle,
    HeaderMenu,
    Span,
    MealBody,
    LeftPanel,
    ImageContainer,
    RightPanel,
    RightPanelBottom,
    Image
} from './meal_show_style';


class MealShow extends Component {
    componentDidMount() {
        this.props.setMenuItem('');

        const {id} = this.props.match.params;
        this.props.fetchMeal(id);
    }

    render() {
        const {meal} = this.props;
        let editIcon;
        let hearthIcon;

        if (meal && AuthService.isLogged()) {
            const {sub} = AuthService.getDecodedToken();

            hearthIcon = (
                <a href='#'>
                    <Span>
                        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" fill="currentColor" style={{fontSize: '30px'}}/>
                        Favourite
                    </Span>
                </a>
            );

            editIcon = (() => {
                if (sub === meal.userId)
                    return (
                        <Link to={`/meals/${meal.id}/edit`}>
                            <Span>
                                <Icon type="setting" style={{fontSize: '30px'}}/>
                                Edit
                            </Span>
                        </Link>
                    );
            })();
        }

        if (!meal)
            return (
                <div className='content loading-spin'>
                    <Spin size='large'/>
                </div>
            );


        return (
            <div className='content'>
                <MealHeader>
                    <HeaderTitle>{meal.name}</HeaderTitle>
                    <HeaderMenu>
                        {hearthIcon}
                        {editIcon}
                    </HeaderMenu>
                </MealHeader>
                <MealBody>
                    <LeftPanel>
                        <ImageContainer>
                            <Image src={meal.imageUrl} alt={meal.name}/>
                        </ImageContainer>
                        <MealProducts products={meal.products}/>
                    </LeftPanel>
                    <RightPanel>
                        <MealDescription description={meal.description}/>
                        <RightPanelBottom>
                            <MealRecipe recipe={meal.recipe}/>
                            <MealInfo meal={meal}/>
                        </RightPanelBottom>
                    </RightPanel>
                </MealBody>
            </div>
        );
    }
}

const mapStateToProps = ({meals}, ownProps) => {
    return {
        meal: meals.content[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchMeal, setMenuItem})(MealShow);