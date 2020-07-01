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

// DEBUG
db._setupFakeData(5);

//////////////////////////////////////////////////////////////////////////
// handle standard routes
app.get('/', 
    (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', 
    (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/assets/js/index.js', 
    (req, res) => res.sendFile(path.join(__dirname, 'public/assets/js/index.js'))
);

app.get('/assets/css/styles.css', 
    (req, res) => res.sendFile(path.join(__dirname, 'public/assets/css/styles.css'))
);

//////////////////////////////////////////////////////////////////////////
// handle API routes
app.get('/api/notes', 
    function(req, res)
    {
        // get pagination
        let page = req.query.page;
        let limit = req.query.limit;

        // handle undefined to defaults
        page = (!page) ? 1 : page;
        limit = (!limit) ? 0 : limit;

        // DEBUG
        //console.log("Limit: "+ limit +" on page #"+ page);

        // return the notes
        return res.json( db.getNotes(limit, page) );
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