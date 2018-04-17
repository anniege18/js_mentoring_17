import { combineReducers } from 'redux';
import notes from './notes';
import filters from './filters';
import labels from './labels';

const rootReducer = combineReducers({
    notes,
    filters,
    labels
});

export default rootReducer;