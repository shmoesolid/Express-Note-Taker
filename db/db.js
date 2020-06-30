
/** db class for managing note database file
 *  uses index as ID for deleting
 * 
 */
class db_note
{
    /** constructor of db class
     * 
     * @param {string} fileName 
     */
    constructor(fileName)
    {
        // make file if doesn't exist

        this.fileName = fileName;
        this.data = [];
    }

    addNote(title, note)
    {
        // appends note to object array
	    this.data.push({   
	        "title": title,
		    "text": note
	    });
    }

    deleteNote(index)
    {
	    // throw out of range error
	    if (index < 0 || index >= this.data.length)
	        throw "deleteNote method index param out of range";
	
        // removes note by index/id
	    // TODO confirm auto reindexes (i think does)
	    this.data.splice(index, 1);

	    // save the database
	    //saveDatabase();
    }

    getNotes(limit = null, pageNumber = 1)
    {
        // get note range based on params using math
    }

    saveDatabase()
    {
        // convert and write objArray to this.fileName
        // TODO look into file locking for js
    }

    loadDatabase()
    {
        // read this.fileName and convert into object array and set this.data
    }
}

module.exports = db_note;
