const express = require('express');
const mongoose = require('mongoose');

const meetings = require('./routes/api/meetings');

const app = express();
app.use(express.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connnected'))
    .catch(err => console.log(error));

//Use Routes
app.use('/api/meetings', meetings)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
