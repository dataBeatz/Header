const fs = require("fs");

const inputFilePath = "./data_files/artistData";
const JSONStream = require("JSONStream");
const Artist = require("./index.js"); 



let files = 50
function filesToDB(n) {
  console.log("Started reading file number " + n);
  const parser = JSONStream.parse("*"); // JSON.parse() does not work
  let inputStream = fs
    .createReadStream(`${inputFilePath}${n}.json`)
    .pipe(parser);
  parser.on("data", function(data) {
    Artist.insertMany(data);
  });
  parser.on("end", function() {
    console.log("Finished reading and loading file number " + n);
    if (n < files) {
      n++;
      // inputStream.close();
      filesToDB(n);
    }
  });
}
filesToDB(1);


// const maxChunk = 10000;

// var inserterCargo = async.cargo(function(tasks, inserterCallback) {
//   let chunk_number = (tasks[0].artistID + maxChunk - 1) / maxChunk;
//   console.log("Started processing chunk " + chunk_number);
//   console.log("Current # of tasks: " + tasks.length);

//   Artist.Artist.insertMany(tasks, function(err) {
//     if (err) console.log(err);
//     inserterCallback(); 
//   });
// }, maxChunk);
 
// parser
//   .on("data", data => {
//     console.log("Length of data: " + data.length); 
//     inserterCargo.push(data); 

//   })
//   .on("end", () => {
//     console.log("Read complete");
//   });

// inputStream.pipe(parser);
