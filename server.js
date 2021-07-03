const fs = require('fs');
const path = require('path');
const express = require('express');
const { nanoid } = require('nanoid');

const savedNotes = require('./Develop/db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('./Develop/public'));;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/api/notes', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8')));
})


app.post('/api/notes', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'));
    let id = nanoid();
    let makeNote = {
        title: req.body.title,
        text: req.body.text,
        id: id,
    }

    savedNotes.push(makeNote);
    
    
    fs.writeFile('./Develop/db/db.json', JSON.stringify(savedNotes), (err) => {
        if (err) throw err;
    })

    return res.json(savedNotes);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}.`);
});