import { notesCreateValidation } from '../services/validations.js';

import handleValidationErrors from '../services/utils/handleValidationErrors.js';
import {
  archive,
  archivedNotes,
  create,
  getAll,
  getResults,
  remove,
  update,
} from '../repositories/NotesController.ts';

export const router = (app: any) => {
  app.get('/notes/stats', getResults);
  app.get('/notes/archived', archivedNotes);
  app.post('/notes', notesCreateValidation, handleValidationErrors, create);
  app.delete('/notes/:id', remove);
  app.patch('/notes/:id', notesCreateValidation, handleValidationErrors, update);
  app.get('/notes', getAll);
  app.get('/notes/:id', archive);
};
