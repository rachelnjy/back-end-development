const pool = require('../../services/db');

// endpoint 6
module.exports.selectAllEras = (callback) => {
    // controller calling it
    const SQLSTATMENT = ` 
    SELECT * FROM Eras;
    `;

    pool.query(SQLSTATMENT, callback);
}
