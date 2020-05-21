import React, { useState } from 'react';
import ReactDOM from 'react-dom';

async function fetchAudio() {
  const res = await fetch('http://localhost:1337/?id=CfbCLwNlGwU');
  return res.body.getReader().read();
} 

var isFetched = false;

function App(props) {
  const [music, setMusic] = useState({ link: '' });
  if (!isFetched) {
    fetchAudio().then(res => {
      var blob = new Blob([res.value], { type: 'audio/mp3' });
      var url = window.URL.createObjectURL(blob);
      setMusic(url);
      isFetched = true;
    })
  }
  if (music.link != '') {
    window.audio = new Audio();
    window.audio.src = music.link;
    window.audio.autoplay = true;
    window.audio.play();
    return (<p>Compot</p>);
  } 
  return (<div>Hello</div>);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
