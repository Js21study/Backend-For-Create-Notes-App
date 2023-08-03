import { body } from 'express-validator';

export const notesCreateValidation = [
  body('title', 'Write a title for your note correctly').isLength({ min: 3, max: 100 }).isString(),
  body('text', 'Text is too long').optional().isLength({ max: 100 }).isString(),
  body('category', 'There is a problem with choosing category').optional().isNumeric(),
  body('dates', 'Something is wrong with dates').optional().isString(),
];
