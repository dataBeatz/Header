const pg = require ('pg');
const reshape = require ('./dataReshaper.js');
const pool = new pg.Pool ({
  user: 'ShabnamMokhtarani',
  host: '127.0.0.1',
  database: 'headerdb',
  password: null,
  port: '5432',
  max: 700,
});

const getArtistData = (id, showArtist) => {
  let getQuery = `select 
  A.artistname, 
  A.verified, 
  A.followed ,
  A.bio,
  A.images,
  C.Locations,
  C.followersNumber
from artists as A
INNER JOIN locations as C 
on A.artistID = C.locationID
where A.artistID = \n ${id}`;

  pool
    .query (getQuery)
    .then (result => showArtist (result))
    .catch (error => showArtist (error));
};

const writeData = (body, postToDb) => {
  let postQuery = `WITH ins1 AS(
    Insert into artists(artistname, followed, verified, bio, images) values body.artistname, body.followed, body.verified, body.bio, body.images)
  RETURNING artistid as locationID
  ),
  ins2 AS(Insert into locations(Locations, followersNumber) values body.Locations, body.followersNumber)
  )`;
  pool
    .query (postQuery)
    .then (result => postToDb (reshape (result)))
    .catch (error => postToDb (error));
};

module.exports.getArtistData = getArtistData;
module.exports.writeData = writeData;
