CREATE TABLE IF NOT EXISTS artists (
  artistID SERIAL PRIMARY KEY,
  artistname TEXT NOT NULL,
  followed BOOLEAN NOT NULL,
  verified BOOLEAN NOT NULL,
  bio TEXT NOT NULL,
  images json
)


CREATE TABLE IF NOT EXISTS locations (
  id INT SERIAL PRIMARY KEY,
  locationID INT NOT NULL REFERENCES artists(artistID),
  Locations TEXT NOT NULL,
  followersNumber INT NOT NULL
  
)