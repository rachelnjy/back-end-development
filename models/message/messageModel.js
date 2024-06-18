const pool = require('../../services/db');

module.exports.insertSingleMessage = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Messages (message_text, userid)
    VALUES (?, ?);
    `
    const VALUES = [data.message_text, data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectAllMessages = (callback) => {
    const SQLSTATMENT = `
    SELECT 
        messages.id,
        messages.message_text,
        user.user_id,
        user.username
    FROM
        messages
    JOIN
        user
    ON
        messages.userid = user.user_id
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectMessageById = (data, callback) => 
{
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE id = ?
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);

}

module.exports.updateMessageById = (data, callback) => 
{
    const SQLSTATMENT = `
    UPDATE Messages
    SET message_text = ?, userid = ?
    WHERE id = ? 
    `;

    const VALUES = [data.message_text, data.userid, data.id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteMessageById = (data, callback) => 
{
    const SQLSTATMENT = `
    DELETE FROM Messages
    WHERE id = ? AND userid = ?;
    `;
    const VALUES = [data.id, data.userid];
    pool.query(SQLSTATMENT, VALUES, callback);

}
