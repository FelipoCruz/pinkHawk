import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import router from './router'

dotenv.config({ path: path.join(__dirname, '../.env') });
const port = process.env.SERVER_PORT


const app = express();

app.use(express.json());
app.use(router)

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
