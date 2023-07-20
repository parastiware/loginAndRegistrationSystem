const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sauravadhikari98:Test123@testclustor.6mvfdo9.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connectDb = mongoose.connection;
connectDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connectDb;