const fs = require ('fs');

let writeStuff = (writeStream, about, index) =>
  new Promise ((resolve, reject) => {
    writeStream.write (about, 'utf-8', () => {
      console.log (`generated ${index}`);
      writeStream.end (resolve);
    });
  });


let images = 'imageid,Images\n'

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
let index = 1

const generateLoop = async () => {
   let start = 1;
   let stop = 500000;
   for (let i = 1; i < 21; i++){
    const generateData = () => {
      for (let j = start; j < stop+1; j++) {
        for (let k = 1; k < 6; k++) {
        let num = getRandomInt(501, 1);
          images +=`${j},https://s3.amazonaws.com/spotifyphotos/${num}.jpg\n`
      }
      }
    }
    console.log('loop ended', stop)
    generateData()
    let writeStream = fs.createWriteStream (`./artistImages${i}.csv`,  {"flags": "a"});
    await writeStuff (writeStream, images, stop);
    images = '';
    start += 500000;
    stop += 500000;
    }
 }


 generateLoop()