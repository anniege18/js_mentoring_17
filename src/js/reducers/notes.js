import * as actions from '../actions';
import { omit } from 'lodash';

const initId = 0;

const notes = (state = [], action) => {
    switch (action.type) {
        case actions.NOTES_SUCCESS:
            return action.notes;
        case actions.ADD_NOTE:
            let currentId = state.length ? Math.max(...state.map(({id}) => id)) : initId;
            return [
                ...state,
                {
                    id: ++currentId,
                    ...omit(action, 'type'),
                }
            ];
        case actions.REMOVE_NOTE:
            return state.filter(({ id }) => id !== action.id );
        case actions.UPDATE_NOTE:
            return state.map(note => {
                if (note.id !== action.id ) return note;

                const filteredPayload = Object.keys(action.payload).reduce((acc, key) => {
                    if (key in note && key !== 'id') {
                        return {
                          ...acc,
                            [key]: action.payload[key]
                        };
                    } else {
                        return acc;
                    }
                } , {});

                return {
                  ...note,
                  ...filteredPayload,
                };
            });
        case actions.ARCHIVE_NOTE:
            return state.map(note =>
              note.id === action.id ?
                { ...note, archived: action.archived } :
                note);
        default:
            return state;
    }
};

export default notes;