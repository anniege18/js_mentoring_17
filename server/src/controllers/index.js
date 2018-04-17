import { promisify } from 'util';
import { writeFile } from 'fs';
import path from 'path';
import awaitTo from '../helpers';
import notes from '../json/notes.json';

const writeFileAsync = promisify(writeFile);
const resolveUrl = url => path.resolve(__dirname, url);
const notesFilename = resolveUrl('../json/notes.json');

const setNotes = (notes) =>
  awaitTo(writeFileAsync(notesFilename, JSON.stringify(notes, null, 2)));

export const getNotes = (req, res) => {
    if (!notes.length) {
        res.status(404).json({ error: 'Notes not found' });
        return;
    }

    res.type('json');
    res.status(200).json({ notes });
};

export const addNote = async (req, res) => {
    if (!notes.length) {
        res.status(404).json({ error: 'Notes not found' });
        return;
    }

    req.body.id = Math.max( ...notes.map(({ id }) => id) ) + 1;
    notes.push(req.body);
    const [error] = await setNotes(notes);
    if (error) {
        res.sendStatus(500);
        return;
    }
    res.status(200).json(req.body);
};

export const updateNote = async (req, res) => {
    if (!notes.length) {
        res.status(404).json({ error: 'Notes not found' });
        return;
    }

    const foundNoteIndex = notes.findIndex(
      ({ id }) => id === Number(req.params.id)
    );

    if (foundNoteIndex === -1) {
        res.status(404).json({ error: 'Note not found' });
        return;
    }

    notes[foundNoteIndex] = { ...notes[foundNoteIndex], ...req.body };

    const [error] = await setNotes(notes);
    if (error) {
        res.sendStatus(500);
        return;
    }
    res.status(200).json(req.body);
};