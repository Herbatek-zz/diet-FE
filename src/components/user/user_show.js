import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setMenuItem, fetchUser} from "../../actions";
import {LOADING_SPIN} from "../../helpers/messages";
import AuthService from "../../helpers/auth_service";
import EditIcon from './../common/icons/editIcon';


class UserShow extends Component {
    state = {
        isLoggedIn: AuthService.isLogged(),
        productId: this.props.match.params.id,
        modalVisible: false,
        amount: 0
    };

    componentDidMount() {
        this.props.setMenuItem('');
        this.props.fetchUser(this.state.productId);
    }

    render() {
        const {user} = this.props;

        if (!user)
            return LOADING_SPIN;

        return (
            <div style={{"background": "red"}}>
                <div>
                    Nazwa użytkownika: {this.props.user.username}
                </div>
                <div>
                    Imie: {this.props.user.firstName}
                </div>
                <div>
                    Nazwisko: {this.props.user.lastName}
                </div>
                <div>
                    Email: {this.props.user.email}
                </div>
                <div>
                    Avatar: <img src={this.props.user.picture_url}/>
                </div>
                <div>
                    Wiek: {this.props.user.age}
                </div>
                <div>
                    Wzrost: {this.props.user.height}
                </div>
                <div>
                    Waga: {this.props.user.weight}
                </div>
                <EditIcon link={'/user/edit'}/>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {
        user
    }
};

export default connect(mapStateToProps, {setMenuItem, fetchUser})(UserShow);