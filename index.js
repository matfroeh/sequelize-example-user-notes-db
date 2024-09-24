// Import express and the db file just for side effects (to connect to the database)
import express from 'express';
import cors from 'cors';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from './controllers/users.js';
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from './controllers/notes.js';
import './db/index.js';

const app = express();
// console.log(process.env.PORT);

const port = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.route('/users').get(getUsers).post(createUser);
app.route('/users/:id').get(getUserById).put(updateUser).delete(deleteUser);

app.route('/notes').get(getNotes).post(createNote);
app.route('/notes/:id').get(getNoteById).put(updateNote).delete(deleteNote);

app.listen(port, () => console.log(`Server is running on port ${port}`));
