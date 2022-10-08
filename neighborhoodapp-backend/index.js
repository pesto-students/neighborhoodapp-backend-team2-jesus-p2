import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/Database.js';
import router from './routes/index.js';
import Comment from './models/CommentModel.js';
import User from './models/UserModel.js';
import Post from './models/PostModel.js';
import Category from './models/CategoryModel.js';
import Association from './models/Association.js'

// import db from './models/index.js';
dotenv.config();
const app = express();
db.sync();


app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(8080, () => console.log('Server running at port 8081'))