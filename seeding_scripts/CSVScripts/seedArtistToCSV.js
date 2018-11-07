const fs = require ('fs');
const faker = require ('faker');

let writeStuff = (writeStream, artist, index) =>
  new Promise ((resolve, reject) => {
    writeStream.write (artist, 'utf-8', () => {
      console.log (`generated ${index}`);
      writeStream.end (resolve);
    });
  });

let artist = 'artistName,followed,verified,bio,images\n';

let createImagesArray = () => {
  let images = [];

  function getRandomInt (max, min) {
    return Math.floor (Math.random () * (max - min) + min);
  }
  for (let k = 1; k < 6; k++) {
    let num = getRandomInt (501, 1);
    images.push (`""https://s3.amazonaws.com/spotifyphotos/${num}.jpg""`);
  }

  //console.log(images);
  return images;
};

const generateLoop = async () => {
  let start = 1;
  let stop = 200000;
  for (let i = 1; i < 51; i++) {
    const generateArtistData = function () {
      for (let j = start; j < stop + 1; j++) {
        artist += `${faker.name.findName ()},${Math.round (Math.random ()) ? true : false},${Math.round (Math.random () * 0.7 + 0.3) ? true : false},${faker.lorem.paragraphs (1)},"[${createImagesArray ()}]"\n`;
      }
    };
    generateArtistData ();
    let writeStream = fs.createWriteStream (`./artistTableData.csv`, {
      flags: 'a',
    });
    await writeStuff (writeStream, artist, stop);
    artist = '';
    start += 200000;
    stop += 200000;
  }
};
generateLoop ();
