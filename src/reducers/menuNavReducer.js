import {SELECT_MENU_ITEM} from "../actions";


export default (state = '', action) => {
    switch (action.type) {
        case SELECT_MENU_ITEM:
            return action.payload;


        default:
            return state;
    }
}