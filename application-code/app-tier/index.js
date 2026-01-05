const transactionService = require('./TransactionService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* ============================
   ROUTES
============================ */

// Health check
app.get('/health', (req, res) => {
    res.json("This is the health check");
});

/* ============================
   ADD TRANSACTION
============================ */
app.post('/transaction', (req, res) => {
    try {
        console.log(req.body);

        const amount = req.body.amount;
        const description = req.body.description;

        transactionService.addTransaction(amount, description, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "DB insert failed",
                    error: err.message
                });
            }

            res.json({ message: "added transaction successfully" });
        });

    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            error: err.message
        });
    }
});

/* ============================
   GET ALL TRANSACTIONS
============================ */
app.get('/transaction', (req, res) => {
    try {
        transactionService.getAllTransactions((err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "could not get all transactions",
                    error: err.message
                });
            }

            const transactionList = results.map(row => ({
                id: row.id,
                amount: row.amount,
                description: row.description
            }));

            res.status(200).json({ result: transactionList });
        });

    } catch (err) {
        res.status(500).json({
            message: "unexpected error",
            error: err.message
        });
    }
});

/* ============================
   DELETE ALL TRANSACTIONS
============================ */
app.delete('/transaction', (req, res) => {
    try {
        transactionService.deleteAllTransactions((err) => {
            if (err) {
                return res.status(500).json({
                    message: "delete failed",
                    error: err.message
                });
            }

            res.json({ message: "delete function execution finished." });
        });

    } catch (err) {
        res.status(500).json({
            message: "Deleting all transactions may have failed.",
            error: err.message
        });
    }
});

/* ============================
   DELETE TRANSACTION BY ID
============================ */
app.delete('/transaction/id', (req, res) => {
    try {
        const id = req.body.id;

        transactionService.deleteTransactionById(id, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "error deleting transaction",
                    error: err.message
                });
            }

            res.json({
                message: `transaction with id ${id} deleted`
            });
        });

    } catch (err) {
        res.status(500).json({
            message: "error deleting transaction",
            error: err.message
        });
    }
});

/* ============================
   GET TRANSACTION BY ID
============================ */
app.get('/transaction/id', (req, res) => {
    try {
        const id = req.body.id;

        transactionService.findTransactionById(id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "error retrieving transaction",
                    error: err.message
                });
            }

            if (!result || result.length === 0) {
                return res.status(404).json({ message: "Transaction not found" });
            }

            res.json({
                id: result[0].id,
                amount: result[0].amount,
                description: result[0].description
            });
        });

    } catch (err) {
        res.status(500).json({
            message: "error retrieving transaction",
            error: err.message
        });
    }
});

/* ============================
   START SERVER
============================ */
app.listen(port, () => {
    console.log(`AB3 backend app listening at http://localhost:${port}`);
});
