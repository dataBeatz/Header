const Sequelize = require('sequelize');
const sequelize = new Sequelize('headerdb', "", "", {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Artist = sequelize.define("artists", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
   artistName: {
     type: Sequelize.STRING,
     allowNull: false
   },
   followed: {
     type: Sequelize.BOOLEAN,
     allowNull: false,
     defaultValue: false
   },
   verified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
   }
});

const Images = sequelize.define('artistimages', {
  img1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img3: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img4: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img5: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Bio = sequelize.define('artistbio', {
  Biography: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  Location1: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  FollowersNumber1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Location2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  FollowersNumber2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Location3: {
    type: Sequelize.STRING,
    allowNull: false
  },
  FollowersNumber3: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
 
//relationships

Artist.hasMany(Images);
Images.belongsTo(Artist);
Artist.hasMany(Bio);
Bio.belongsTo(Artist);

sequelize.sync().then(() => {

});


module.exports.Artist = Artist;
//module.exports.Bio = Bio;
//module.exports.Song = Song;






























// const mongoose = require('mongoose');
// mongoose.connect(require('../config/mlab.js'));

// const db = mongoose.connection;
// db.on('error', error => {
//   console.error(error);
// });
// db.once('open', () => {
//   console.log('MONGOOSE CONNECTED!');
// });

// const headerDBSchema = new mongoose.Schema({
//   artistID: {
//     type: Number,
//     unique: true
//   },
//   followed: Boolean,
//   artistName: String,
//   followersNumber: Number,
//   artistImages: [String],
//   about: {
//     Biography: String,
//     Where: Object
//   }
// });

// const HeaderDB = mongoose.model('HeaderDB', headerDBSchema);
// module.exports = HeaderDB;

// NOTE: To be used later
// const userSchema = new mongoose.Schema({
//   userID: {
//     type: Number,
//     unique: true
//   },
//   userName: String,
//   artistsFollowing: Object
// });
