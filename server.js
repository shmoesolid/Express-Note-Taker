//////////////////////////////////////////////////////////////////////////
// requires
const express = require("express");
const path = require('path');
const DB_Note = require("./db/db");

//////////////////////////////////////////////////////////////////////////
// setup server
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//////////////////////////////////////////////////////////////////////////
// setup database
const db = new DB_Note();

//////////////////////////////////////////////////////////////////////////
// handle standard routes
app.get('/', 
    (req, res) => res.sendFile( path.join(__dirname, 'public', 'index.html') )
);

app.get('/notes', 
    (req, res) => res.sendFile( path.join(__dirname, 'public', 'notes.html') )
);

// for handling assets single dir and file (client css and js)
app.get('/assets/:dir/:file',
    function (req, res)
    {
        // readability
        let dir = req.params.dir;
        let file = req.params.file;

        // send it
        res.sendFile( path.join(__dirname, 'public', 'assets', dir, file) );
    }
);

//////////////////////////////////////////////////////////////////////////
// handle API routes
app.get('/api/notes', 
    function (req, res)
    {
        // return the notes
        return res.json( db.getNotes() );
    }
);

app.post('/api/notes', 
    function(req, res)
    {
        // readability
        let newNote = req.body;

        // don't add if note data empty
        if (!newNote.title || !newNote.text)
            return res.json(false);

        // add and return json success/failure
        return res.json( db.addNote(newNote.title, newNote.text) );
    }
);

app.delete('/api/notes/:id', 
    function(req, res)
    {
        // readability
        let id = req.params.id;

        // delete note by id and return json sucess/failure
        return res.json( db.deleteNote(id) );
    }
);

//////////////////////////////////////////////////////////////////////////
// start server
app.listen(PORT, () => console.log('Server listening on PORT ' + PORT));