import { Request, Response } from "express";

const express = require('express')
const app = express();
const router = require('./router');

const cors = require('cors');
// const corsConfig = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// }

const port = 3001;
app.use(cors("*"));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
