import * as actions from '../actions';
import { omit } from 'lodash';

const filters = (state = {}, action) => {
    switch (action.type) {
        case actions.SET_FILTER:
            return {
                ...state,
                [action.filter]: action.value
            };
        case actions.DROP_FILTER:
            return {
              ...omit(state, action.filter)
            };
        default:
            return state;
    }
};

export default filters;