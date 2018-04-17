export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const ARCHIVE_NOTE = 'ARCHIVE_NOTE';

export const SET_FILTER = 'SET_FILTER';
export const DROP_FILTER = 'DROP_FILTER';

export const ADD_LABEL = 'ADD_LABEL';
export const REMOVE_LABEL = 'REMOVE_LABEL';

export const NOTES_REQUEST = 'NOTES_REQUEST';
export const NOTES_SUCCESS = 'NOTES_SUCCESS';
export const NOTES_FAILURE = 'NOTES_FAILURE';

// notes
export const addNote = ({ title = '', text, labels = [], color = '#ffffff', pined = false, archived = false }) => ({
    type: ADD_NOTE,
    title,
    text,
    labels,
    color,
    pined,
    archived,
});

export const removeNote = (id) => ({
    type: REMOVE_NOTE,
    id,
});

export const updateNote = (id, payload = {}) => ({
    type: UPDATE_NOTE,
    id,
    payload,
});

export const archiveNote = (id, archived) => ({
    type: ARCHIVE_NOTE,
    id,
    archived,
});

export const getNotes = () => ({
   type: NOTES_REQUEST
});

export const getNotesSuccess = notes => ({
    type: NOTES_SUCCESS,
    notes
});

export const getNotesFailure = error => ({
     type: NOTES_FAILURE,
     error
});

//filters
export const applyFilter = (filter, value) => ({
    type: SET_FILTER,
    filter,
    value,
});

export const dropFilter = (filter) => ({
    type: DROP_FILTER,
    filter
});

//labels
export const addLabel = (label) => ({
    type: ADD_LABEL,
    label,
});

export const removeLabel = (label) => ({
    type: REMOVE_LABEL,
    label,
});