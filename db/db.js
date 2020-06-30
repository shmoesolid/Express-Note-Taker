
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
    }

    deleteNote(index)
    {
        // removes note by index/id
    }

    getNotes(limit = null, pageNumber = 1)
    {

    }

    saveDatabase()
    {
        // convert and write objArray to this.fileName
    }

    loadDatabase()
    {
        // read this.fileName and convert into object array and set this.data
    }
}

module.exports = db_note;