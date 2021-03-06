// requires for db class
const fs = require('fs');
const path = require('path');

/** db class for managing note database file
 *  uses index as ID for deleting
 * 
 */
class DB_Note
{
    /** constructor
     * 
     * @param {string} fileName (doesn't handle dir if dir not made)
     * @param {number} maxNotes (no pagination yet so don't make too high)
     * @param {number} maxTitleLength (match client side length)
     * @param {number} maxNoteLength (match client side length)
     */
    constructor(fileName = "db.json", maxNotes = 10, maxTitleLength = 28, maxNoteLength = 2048)
    {
        this.outputPath = path.join(__dirname, fileName);

        this.fileName = fileName;
        this.maxNotes = maxNotes;
        this.maxTitleLength = maxTitleLength;
        this.maxNoteLength = maxNoteLength;
        this.data = [];

        this._loadDatabase();
        //this._setupFakeData(5);
    }

    /** addNote
     * adds a note with a unique ID and saves if allowed
     * 
     * @param {string} title 
     * @param {string} note 
     * @param {boolean} forceSave
     */
    addNote(title, note, forceSave = true)
    {
        // don't add if reached max or title or note lengths
        if (this.data.length >= this.maxNotes
            || title.length > this.maxTitleLength
            || note.length > this.maxNoteLength
        ) {
            return false;
        }
        
        // appends note to object array
	    this.data.push({
	        "title": title,
            "text": note,
            "id": this._generateUniqueID()
        });
        
        // save the database if desired
        return (forceSave) ? this._saveDatabase() : false;
    }

    /** deleteNote
     * removes note by index from ID
     * 
     * @param {number} id
     */
    deleteNote(id)
    {
        // get its index by ID
        var index = this._getNoteIndexByID(id);

        // returns if no index found
        if (index === -1)
            return false;

        // removes note by the index
	    this.data.splice(index, 1);

	    // save the database
        return this._saveDatabase();
    }

    /** getNotes
     * gets the notes (pagination not implemented yet)
     * 
     * @param {number} limit 
     * @param {number} pageNumber 
     */
    getNotes(limit = 0, pageNumber = 1)
    {
        // TODO (maybe) setup pagination

        // return all data for now
        return this.data;
    }

    /** _generateUniqueID
     * generates an ID and confirms doesn't exist
     * 
     * @param {boolean} extra (adds extra random number string)
     */
    _generateUniqueID(extra = true)
    {
        do {
            // gets current unix date to string
            var newID = Math.floor(new Date() / 1000).toString();

            // adds extra random to help uniqueness on first run
            newID += (extra) ? Math.floor(Math.random(0, 1) * 1000).toString() : "";

        // try again if our ID exists
        } while (this._idExists(newID));

        // return it
        return newID;
    }

    /** _idExists
     * checks if exists and returns true or false
     * 
     * @param {number} id (int)
     */
    _idExists(id)
    {
        return this._getNoteIndexByID(id) !== -1;
    }

    /** _getNoteIndexByID
     * gets the index if exists otherwise -1
     * 
     * @param {number} id (int)
     */
    _getNoteIndexByID(id)
    {
        // search for and return the index if id found
        return this.data.findIndex( (obj) => obj.id == id );
    }

    /** _saveDatabase
     * 
     */
    _saveDatabase()
    {
        // convert and write objArray to this.fileName
        fs.writeFile(
            this.outputPath, 
            JSON.stringify(this.data), 
            'utf-8', 
            (err) => { if (err) throw err; }
        );

        // just give back true
        return true;
    }

    /** _loadDatabase
     * 
     */
    _loadDatabase()
    {
        // read this.outputPath and convert into object array and set this.data
        // this only runs once upon server start so force sync
        // to make sure we got the data
        var d = JSON.parse(fs.readFileSync(this.outputPath));
        this.data = (d != null) ? d : [];

        // just give back true
        return true;
    }

    /** _setupFakeData
     * DEBUG fake data setup
     * 
     * @param {number} length (int)
     */
    _setupFakeData(length = 100)
    {
        for (let i = 0; i < length; i++)
        {
            var adjIndex = i + 1;
            this.addNote(
                "Title #"+ adjIndex, 
                "Note data for title #"+ adjIndex, 
                !(adjIndex < length) // only save on last one so not slamming my SSD with writes
            );
        }
    }
}

module.exports = DB_Note;
