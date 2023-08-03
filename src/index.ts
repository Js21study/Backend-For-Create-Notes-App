import express from 'express';
import mongoose from 'mongoose';
import { router } from './routes/notes.js';

mongoose
  .connect(
    'mongodb+srv://admin:*****@cluster0.n9ckvre.mongodb.net/notes?retryWrites=true&w=majority',
  )
  .then(() => console.log('db is launched'))
  .catch((err) => console.log('db error', err));

const app = express();

app.use(express.json());

router(app);

app.listen(4444, (err?: Error) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server work');
});
