const faker = require ('faker');
const fs = require ('fs');
faker.locale = 'en_US';

let writeStuff = (writeStream, json, index) =>
  new Promise ((resolve, reject) => {
    writeStream.write (json, 'utf-8', () => {
      console.log (`generated ${index}`);
      writeStream.end (resolve);
    });
  });

let allArtists;
const generateLoop = async () => {
  let start = 1;
  let stop = 200000;
  for (let j = 1; j < 51; j++) {
    let generateData = () => {
      allArtists = [];
      for (let i = start; i < stop + 1; i++) {
        let newArtist = {
          artistID: i,
          artistName: faker.name.findName (),
          followed: Math.round (Math.random ()) ? true : false,
          followersNumber: 'PLACE_HOLDER',
          verified: Math.round (Math.random () * 0.7 + 0.3) ? true : false,
          artistImages: [],
          about: {
            Biography: faker.lorem.paragraphs (1),
            Where: {},
          },
        };
        for (let i = 0; i < 6; i++) {
          newArtist.about.Where[faker.address.city ()] = faker.random.number ({
            min: 1000,
            max: 100000,
          });
        }
        var obj = {};
        for (let i = 1; i <= faker.random.number ({min: 2, max: 10}); i++) {
          obj[faker.random.number ({min: 1, max: 27})] = null;
        }
        function getRandomInt (max) {
          return Math.floor ((Math.random () + 1) * Math.floor (max));
        }
        for (let k = 1; k < 6; k++) {
          let num = getRandomInt (251);
          newArtist.artistImages.push (
            `https://s3.amazonaws.com/spotifyphotos/${num}.jpg\n`
          );
        }
        newArtist.followersNumber = Object.values (
          newArtist.about.Where
        ).reduce ((accumulator, currentValue) => accumulator + currentValue);
        allArtists.push (newArtist);
      }
    };
    generateData (200000);
    let writeStream = fs.createWriteStream (`./artistData${j}.json`);
    let json = JSON.stringify (allArtists);
    await writeStuff (writeStream, json, stop);
    start += 200000;
    stop += 200000;
  }
};

generateLoop ();

// HeaderDB.create(newArtist, function(err, newData) {
//   err ? console.error(error) : console.log(newData);
// });
