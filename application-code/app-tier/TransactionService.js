const mysql = require('mysql');
const dbcreds = require('./DbConfig');

const con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});

// Connect once at startup
con.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

/* =========================
   ADD TRANSACTION
========================= */
function addTransaction(amount, description, callback) {
    const sql = "INSERT INTO transactions (amount, description) VALUES (?, ?)";

    con.query(sql, [amount, description], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
}

/* =========================
   GET ALL TRANSACTIONS
========================= */
function getAllTransactions(callback) {
    con.query("SELECT * FROM transactions", (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
}

/* =========================
   FIND BY ID
========================= */
function findTransactionById(id, callback) {
    con.query(
        "SELECT * FROM transactions WHERE id = ?",
        [id],
        (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        }
    );
}

/* =========================
   DELETE ALL
========================= */
function deleteAllTransactions(callback) {
    con.query("DELETE FROM transactions", (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
}

/* =========================
   DELETE BY ID
========================= */
function deleteTransactionById(id, callback) {
    con.query(
        "DELETE FROM transactions WHERE id = ?",
        [id],
        (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        }
    );
}

module.exports = {
    addTransaction,
    getAllTransactions,
    findTransactionById,
    deleteAllTransactions,
    deleteTransactionById
};
