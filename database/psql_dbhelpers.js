const { getArtistData, writeData } = require('../database/psql_index.js');
const redis = require('redis');
const reshape = require('./dataReshaper.js')
const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT);

const getData = (req, res) => {
  let id = req.params.artistID; 
  getArtistData(id, (data) => {
    client.setex(id, 36000, JSON.stringify(reshape(data.rows)));

   res.status(200).send(reshape(data.rows));
  });
}
const postData = (req, res) => {
  let artistData = {
    artistname : 'alice cooper',
    followed: true,
    verified: true,
    bio: 'this guy bit the head off a chicken',
    images: ['imgur1', 'imgur2', 'imgur3', 'imgur4', 'imgur5'],
    locations: 'michigan',
    followersNumber: 878787
  }
  writeData(artistData, (err, data) => {
    if (err) {
      res.status(503).send(err);
    } else {
      res.status(201).send(data);
    }
  })
}

const getCache = (req, res) => {
  let id = req.params.artistID; 
  client.get(id, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getData(req, res);
    }
  })

}

module.exports.getData = getData;
module.exports.postData = postData;
module.exports.getCache = getCache;