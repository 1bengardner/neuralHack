const rndsong = require("rnd-song");
const genreCode = require("rnd-song/genres.json");

const numGenres = Object.keys(genreCode).length;
const randomGenreIndex = Math.floor(Math.random() * Math.floor(numGenres - 1));
const randomGenre = genreCode[Object.keys(genreCode)[randomGenreIndex]];

const options = {
  api_key: "c6539952763470563990a065db1ca229",
  genre: 21,
  snippet: true,
  language: "en"
};

rndsong(options, function(err, res) {
  if (!err) {
    console.log(`Track: ${res.track.track_soundcloud_id}`);
  } else {
    console.log(err);
  }
});
