import axios from 'axios';

export const fetchNotes = () => axios.get('/api/notes').then(({ data: { notes } }) => notes);
export const addNote = () => axios.post('/api/notes').then(({ data }) => data);