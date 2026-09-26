require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

connectDB().then((isConnected) => {
  if (!isConnected) {
    console.log('Running in Development/Fallback mode without MongoDB.');
  }
  app.listen(PORT, () => {
    console.log(`Backend service is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to start server due to database connection issue:", err);
  process.exit(1);
});
