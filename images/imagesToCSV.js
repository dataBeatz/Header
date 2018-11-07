const fs = require ('fs');
const images = 'imageid,Images\n';

//writes image data to csv

const writeStuff = (writeStream, about, index) =>
  new Promise ((resolve, reject) => {
    writeStream.write (about, 'utf-8', () => {
      console.log (`generated ${index}`);
      writeStream.end (resolve);
    });
  });

const getRandomInt = (max, min) => {
  return Math.floor (Math.random () * (max - min) + min);
};

const generateLoop = async () => {
  let start = 1;
  let stop = 500000;
  for (let i = 1; i < 21; i++) {
    const generateData = () => {
      for (let j = start; j < stop + 1; j++) {
        for (let k = 1; k < 6; k++) {
          let num = getRandomInt (501, 1);
          images += `${j},https://s3.amazonaws.com/spotifyphotos/${num}.jpg\n`;
        }
      }
    };
    generateData ();
    let writeStream = fs.createWriteStream (`./artistImages${i}.csv`, {
      flags: 'a',
    });
    await writeStuff (writeStream, images, stop);
    images = '';
    start += 500000;
    stop += 500000;
  }
};

generateLoop ();
