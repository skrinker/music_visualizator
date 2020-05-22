import React from 'react';
import './index.css';

function Visualizator(props) {
  console.log();
  const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    let audio;

    fetch(`http://localhost:1337/?id=${props.link}`)
      .then(data => data.arrayBuffer())
      .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
      .then(decodedAudio => {
        audio = decodedAudio;
      })
      
    function playback() {
      const playSound = ctx.createBufferSource();
      
      playSound.buffer = audio;
      playSound.connect(analyser);
      analyser.connect(ctx.destination);
      playSound.start(ctx.currentTime);
      loop();
    }
    
    function loop() {
      window.requestAnimationFrame(loop);
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);

      for (var i = 1; i < 23; i++) {
        document.querySelector(`ul li:nth-child(${i})`).style.marginTop = `${array[Math.floor(40 - i)]}px`;
      }

      document.querySelector('body').style.backgroundColor = `rgb(${array[40]}, ${array[35]}, ${array[25]})`; 
    }

    window.addEventListener("mousedown", playback);
  return (<div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>);
};

export default Visualizator;