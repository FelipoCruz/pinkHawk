import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import router from './router';
import cookieParser from 'cookie-parser';
import job from './integration/twitter-service/twitter-api.service';

dotenv.config({ path: path.join(__dirname, '../.env') });
const port = process.env.SERVER_PORT || 5000;
const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(router);
// job();

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
