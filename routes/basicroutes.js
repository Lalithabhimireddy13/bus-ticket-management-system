const express = require('express');

const router = express.Router();

// Route to open home.ejs
router.get('/', (req, res) => {
    res.render('home');
});

// Route to open add-ticket.ejs
router.get('/add-ticket', (req, res) => {
    res.render('book-ticket');
});

// Route to open tickets.ejs
router.get('/viewtickets', (req, res) => {
    res.render('tickets');
});


module.exports = router;