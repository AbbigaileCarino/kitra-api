const express = require('express');
const userRoutes = require('./routes/userRoutes');
const treasureRoutes = require('./routes/treasureRoutes');
const { sequelize } = require('./models/model');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the treasure routes in the application
app.use('/api/users', userRoutes);
app.use('/api', treasureRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Sync the models with the database and start the server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
