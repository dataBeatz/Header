const newRelic = require ('newrelic');
const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const { getData, postData, getCache } = require ('../database/psql_dbhelpers.js');
const cluster = require ('cluster');
const os = require ('os');

if (cluster.isMaster) {
  const cpuCount = os.cpus ().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork ();
  }
} else {
  const app = express ();
  app.use (bodyParser.json ());
  app.use (express.static (__dirname + '/../public/dist'));
  app.use (cors ());

  app.get ('/artists/:artistID', getCache);
  app.post ('/artists/:newArtistID', postData);

  app.listen (process.env.PORT || 3004, function onStart (err) {
    if (err) {
      console.log (err);
    }
  });

  cluster.on ('exit', (worker, code, signal) => {
    console.log (
      'worker %d died (%s). restarting...',
      worker.process.pid,
      signal || code
    );
    cluster.fork ();
  });
  module.exports = app;
}
