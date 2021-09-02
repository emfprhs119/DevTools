/*
var https = require('https');
https.globalAgent.maxSockets = 10;
const express = require('express');
const app = express();
const api = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3002;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.listen(port, ()=>console.log(`Listening on port ${port}`));
app.use(cors());
app.use('/api', api);
*/