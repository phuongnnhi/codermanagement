const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const router = require('./routes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/', router);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage! Please go to /api/users for users api, and /api/tasks for tasks api');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))