import * as actions from '../actions';

const labels = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_LABEL:
            return !state
              .filter(label => label === action.label).length ?
                  state.concat(action.label) :
                  state;
        default:
            return state;
    }
};

export default labels;