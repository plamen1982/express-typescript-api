import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { authorRouter } from './author/author.router';

//dotenv.config(); reading the .env file for configuration variables during the runtime of the application
dotenv.config();

if(!process.env.PORT) {
    process.exit(1)
}
//TODO delete after server is started for the first time
console.log(typeof process.env.PORT);

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/authors', authorRouter)
app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
})