const express = require('express');
const router = express.Router();
const axios = require('axios');
const ticket = require('../models/ticket'); // Import your ticket model
//require('dotenv').config();

const SMS_URL = 'https://www.fast2sms.com/dev/bulkV2';
const API_KEY = 'Gz8VvNwVTBEjoHCWdfr26zkxVbLKlclk60MI7V8VJxZq6yJLAL7W5tEeQgw1';

// Route for creating tickets
router.post('/tickets', async (req, res) => {
    try {
        // Check if a ticket with the provided name already exists
        const existingTicket = await ticket.findOne({ pnr: req.body.pnr });
        if (existingTicket) {
            res.render('home', { message: 'A ticket with this pnr already exists' });
        } else {
            // Create a new ticket
            const newTicket = await ticket.create(req.body);

            // Send SMS notification
            const message = 'New ticket created with PNR: ' + req.body.pnr +'and Date of Journey is: '+req.body.busdate ; // Customize the message as needed
            const mobileNumber = newTicket.mobileNumber; // Replace with the actual mobile number from the new ticket

            // Make an HTTP POST request to send the SMS
            await axios.post(
                SMS_URL,
                {
                    route: 'q',
                    message: message,
                    language: 'english',
                    flash: 0,
                    numbers: mobileNumber,
                },
                {
                    headers: {
                        'authorization': API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Render home.ejs with success message
            res.render('home', { message: 'Ticket created successfully and SMS sent' });
        }
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
});

// Get all tickets or a single ticket by name
router.get('/tickets', async (req, res) => {
  try {
    if (req.query.pnr) {
      // A nameis provided in the query string, find a ticket by name
      const ticket = await ticket.findOne({ pnr: req.query.pnr });
      if (ticket) {
        res.render('tickets', { tickets: [ticket] }); // Render tickets.ejs with the ticket's data
      } else {
        res.render('home', { error: 'No ticket exists' });
      }
    }
    else {
      // No name is provided in the query string, return all tickets
      const tickets = await ticket.find();
      res.render('tickets', { tickets: tickets }); // Render tickets.ejs with all tickets' data
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/tickets/:pnr', async (req, res) => {
  try {
    const tickets = await ticket.findOne({ pnr: req.params.pnr });
    const amount = tickets.amount;
    
    const regdate = tickets.regdate;
    const busdate = tickets.busdate;
    await ticket.findOneAndDelete({ pnr: req.params.pnr });

    
    res.status(200).json({ message: 'Ticket deleted successfully', amount, regdate , busdate });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
