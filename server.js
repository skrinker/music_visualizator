const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const cors = require('./middlewares');
const speaker = require('speaker');

app.listen(1337, () => {
  console.log('Server is running on 1337');
})

app.use(cors);
app.post('/', (req, res, next) => {
  res.setHeader('Content-Disposition', 'attachment');
  res.setHeader('Content-Type', 'audio/mp3')
  const { id } = req.query;
  console.log(id);
  try {
    ffmpeg()
      .input(ytdl(`https://www.youtube.com/watch?v=${id}`))
      .toFormat('mp3')
      .pipe(res)
    res.status(200);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
})
