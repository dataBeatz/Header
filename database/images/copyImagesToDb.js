const pg = require('pg');
const path = require('path');
const pool = new pg.Pool({
  user: 'ShabnamMokhtarani',
  host: '127.0.0.1',
  database: 'headerdb',
  password: null,
  port: '5432'
})

const seedImagesCSV = () => new Promise((resolve, reject) => {
  const fileToCopy = path.join(__dirname, `/CSVImageFiles/artistImages${page}.csv`);
  pool.query(`COPY images(imageid,images) FROM '${fileToCopy}' DELIMITER ',' CSV HEADER;`, (err, res) => {
    if (err) {
    } else {
      resolve();
    }
  })
});

const loopThroughCSV = async (csvToSeed, n) => {
  page = 0;
  for (let i = 1; i < n; i++) {
    page++;
    await csvToSeed();
  }
}

  const runSeeds = async () => {
    await loopThroughCSV(seedImagesCSV, 21);
    pool.end();
  }
  
  runSeeds();