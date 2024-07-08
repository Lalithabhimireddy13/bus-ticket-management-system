const express = require('express');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/ticketDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Middleware
app.use(express.json());
app.use('/api', ticketRoutes);

//app.use('/api', appointmentRoutes);
app.use('/', require('./routes/basicroutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
