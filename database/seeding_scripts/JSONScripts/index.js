const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/headerdbs');

const db = mongoose.connection;
db.on('error', error => {
  console.error(error);
});
db.once('open', () => {
  console.log('MONGOOSE CONNECTED!');
});

const headerDBSchema = new mongoose.Schema({
  artistID: {
    type: Number,
    unique: true
  },
  followed: Boolean,
  artistName: String,
  followersNumber: Number,
  artistImages: [String],
  about: {
    Biography: String,
    Where: Object
  }
});

const Artist = mongoose.model('Artist', headerDBSchema);
module.exports = Artist;

