const mongoose = require('mongoose');

const connectDB = async () => {
  const isRequired = process.env.DB_REQUIRED === 'true';
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing.');
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'smart_resort_360',
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (isRequired) {
      console.error('DB_REQUIRED is true. Exiting...');
      process.exit(1);
    } else {
      console.warn('DB_REQUIRED is false. Falling back to in-memory demo repository.');
      return false;
    }
  }
};

module.exports = connectDB;
