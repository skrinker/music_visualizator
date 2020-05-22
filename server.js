const express = require('express');
const app = express();
const api = require('./api');

console.log(api);
const cors = require('./middlewares');

app.listen(1337, () => {
  console.log('Server is running on 1337');
})

app.use(cors);
app.get('/', api.getAudio);