require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Connect to Database before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend service is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to start server due to database connection issue:", err);
  process.exit(1);
});
