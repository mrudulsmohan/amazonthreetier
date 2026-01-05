const dbcreds = require('./DbConfig');
const mysql = require('mysql');

/**
 * Create DB connection
 */
const con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});

/**
 * Connect once at startup
 */
con.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

/**
 * ADD TRANSACTION
 */
function addTransaction(amount, description, callback) {
    const sql = "INSERT INTO transactions (amount, description) VALUES (?, ?)";
    con.query(sql, [amount, description], function (err, result) {
        if (err) return callback(err);
        callback(null, result);
    });
}

/**
 * GET ALL TRANSACTIONS
 */
function getAllTransactions(callback) {
    const sql = "SELECT * FROM transactions";
    con.query(sql, function (err, result) {
        if (err) return callback(err);
        callback(null, result);
    });
}

/**
 * GET TRANSACTION BY ID
 */
function findTransactionById(id, callback) {
    const sql = "SELECT * FROM transactions WHERE id = ?";
    con.query(sql, [id], function (err, result) {
        if (err) return callback(err);
        callback(null, result);
    });
}

/**
 * DELETE ALL TRANSACTIONS
 */
function deleteAllTransactions(callback) {
    const sql = "DELETE FROM transactions";
    con.query(sql, function (err, result) {
        if (err) return callback(err);
        callback(null, result);
    });
}

/**
 * DELETE TRANSACTION BY ID
 */
function deleteTransactionById(id, callback) {
    const sql = "DELETE FROM transactions WHERE id = ?";
    con.query(sql, [id], function (err, result) {
        if (err) return callback(err);
        callback(null, result);
    });
}

module.exports = {
    addTransaction,
    getAllTransactions,
    findTransactionById,
    deleteAllTransactions,
    deleteTransactionById
};
