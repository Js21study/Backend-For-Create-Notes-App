import NotesModel from '../models/Notes.ts';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  try {
    const notes = await NotesModel.find().exec();
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There is a problem with getting notes!',
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    NotesModel.findOneAndDelete({
      _id: noteId,
    }).then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'This note is undefinded',
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There is a problem with deleting notes!',
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    NotesModel.updateOne(
      {
        _id: noteId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        dates: req.body.dates,
      },
    ).then((doc) => {
      if (!doc) {
        return res.status(500).json({
          message: 'It is impossible to update this note!',
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There is a problem with updating notes!',
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const doc = new NotesModel({
      title: req.body.title,
      text: req.body.text,
      category: req.body.category,
      dates: req.body.category,
      archive: false,
    });

    const note = await doc.save();
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There is a problem with creating this note!',
    });
  }
};

export const archive = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;

    const note = await NotesModel.findOne({
      _id: noteId,
    }).exec();
    const status = note?.archive;

    NotesModel.updateOne(
      {
        _id: noteId,
      },
      {
        archive: !status,
      },
      {
        returnDocument: 'after',
      },
    ).then((doc) => {
      if (!doc) {
        return res.status(500).json({
          message: 'It is impossible to update this note!',
        });
      } else {
        res.json({
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There is a problem with getting notes!',
    });
  }
};

export const getResults = async (req: Request, res: Response) => {
  try {
    const notes = await NotesModel.find().exec();

    const notesTask = notes.filter((note) => note.category === 0);
    const notesTaskActive = notesTask.filter((note) => note.archive === false);
    const notesTaskArchived = notesTask.filter((note) => note.archive === true);

    const notesRandomThought = notes.filter((note) => note.category === 1);
    const notesRandomThoughtActive = notesRandomThought.filter((note) => note.archive === false);
    const notesRandomThoughtArchived = notesRandomThought.filter((note) => note.archive === true);

    const notesIdea = notes.filter((note) => note.category === 2);
    const notesIdeaActive = notesIdea.filter((note) => note.archive === false);
    const notesIdeaArchived = notesIdea.filter((note) => note.archive === true);

    const notesQuote = notes.filter((note) => note.category === 3);
    const notesQuoteActive = notesQuote.filter((note) => note.archive === false);
    const notesQuoteArchived = notesQuote.filter((note) => note.archive === true);

    const resultsObj = [
      {
        category: 0,
        categoryName: 'Task',
        active: notesTaskActive.length,
        archived: notesTaskArchived.length,
      },
      {
        category: 1,
        categoryName: 'Random Thought',
        active: notesRandomThoughtActive.length,
        archived: notesRandomThoughtArchived.length,
      },
      {
        category: 2,
        categoryName: 'Idea',
        active: notesIdeaActive.length,
        archived: notesIdeaArchived.length,
      },
      {
        category: 3,
        categoryName: 'Quote',
        active: notesQuoteActive.length,
        archived: notesQuoteArchived.length,
      },
    ];
    res.json(resultsObj);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There is a problem with getting notes!',
    });
  }
};

export const archivedNotes = async (req: Request, res: Response) => {
  try {
    const notes = await NotesModel.find().exec();
    const archived = notes.filter((note) => note.archive === true);
    res.json(archived);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There is a problem with getting notes!',
    });
  }
};
