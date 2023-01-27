const express = require('express');
const router = require('./routers/router')
const app = express();
const json = require('express').json();

// TODO: CORS

app.use(json)
app.use(router)

const port = 3001;

app.listen(port, () =>
console.log('server listening on port: ' + port))

