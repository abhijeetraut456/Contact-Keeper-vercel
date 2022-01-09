const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
const { mongoURI } = require('./key');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
      console.log('MongoDb connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
