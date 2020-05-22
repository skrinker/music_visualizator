const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const getAudio = (req, res, next) => {
  res.setHeader('Content-Type', 'audio/mp3')
  const { id } = req.query;
  ffmpeg()
    .input(ytdl(`https://www.youtube.com/watch?v=${id}`))
    .toFormat('mp3')
    .on('error', () => {})
    .pipe(res)
}

module.exports = { getAudio };