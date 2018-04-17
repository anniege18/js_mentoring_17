import express from 'express';
import bodyParser from 'body-parser';
import { getNotes, addNote, updateNote } from './controllers';

const router = express.Router();
router.use(bodyParser.json());

router.get('/notes', getNotes);
router.post('/notes', addNote);
router.put('/notes/:id', updateNote);

export default router;