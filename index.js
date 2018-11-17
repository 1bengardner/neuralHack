const rndsong = require("rnd-song");
const genreCode = require("rnd-song/genres.json");
const request = require("request");
const api_keys = require("./config.json");
const fs = require("fs");
const ytdl = require("ytdl-core");
const play = require("audio-play");
const load = require("audio-loader");

const numGenres = Object.keys(genreCode).length;
const randomGenreIndex = Math.floor(Math.random() * Math.floor(numGenres - 1));
const randomGenre = genreCode[Object.keys(genreCode)[randomGenreIndex]];

const options = {
  api_key: api_keys.musicApi,
  genre: randomGenre,
  snippet: true,
  language: "en"
};

async function getRandomSong() {
  rndsong(options, function(err, res) {
    if (!err) {
      request.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${
          res.track.track_name
        }&type=music&key=${api_keys.googleApi}`,
        (error, response, body) => {
          if (!error) {
            ytdl(
              `https://www.youtube.com/watch?v=${
                JSON.parse(body).items[0].id.videoId
              }`
            ).pipe(fs.createWriteStream("./music/test.mp3"));
          }
        }
      );
    } else {
    }
  });
}

async function playSong() {
  const randSong = await getRandomSong();
}

playSong();
