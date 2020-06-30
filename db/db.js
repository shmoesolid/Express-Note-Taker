
/** db class for managing note database file
 * 
 */
class db
{
    /** constructor of db class
     * 
     * @param {string} fileName 
     */
    constructor(fileName)
    {
        // make file if doesn't exist

        this.fileName = fileName;
    }
}

module.exports = db;