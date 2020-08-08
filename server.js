const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');

// Setting view engine to ejs
app.set('view engine', 'ejs');
// Setting the public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})


server.listen(3030);