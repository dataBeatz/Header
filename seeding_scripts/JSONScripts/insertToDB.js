const fs = require ('fs');
const inputFilePath = './data_files/artistData';
const JSONStream = require ('JSONStream');
const Artist = require ('./index.js');

let files = 50;
function filesToDB (n) {
  console.log ('Started reading file number ' + n);
  const parser = JSONStream.parse ('*');
  let inputStream = fs
    .createReadStream (`${inputFilePath}${n}.json`)
    .pipe (parser);
  parser.on ('data', function (data) {
    Artist.insertMany (data);
  });
  parser.on ('end', function () {
    console.log ('Finished reading and loading file number ' + n);
    if (n < files) {
      n++;
      // inputStream.close();
      filesToDB (n);
    }
  });
}
filesToDB (1);
