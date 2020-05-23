import React, { useState, useEffect } from 'react';
import './index.css';
import { Redirect } from'react-router-dom';

function Visualizator(props) {
  const [audio, setAudio] = useState(null);
  const { link } = props;
  const ctx = new AudioContext();
  const playSound = ctx.createBufferSource();
  const analyser = ctx.createAnalyser();
  var dotsRef = React.createRef();

  useEffect(() => {
    console.log(ctx.currentTime);
    if (props.audio && !props.playing) {
      playSound.buffer = props.audio;
      playSound.connect(analyser);
      analyser.connect(ctx.destination);
      playSound.start(ctx.currentTime);
      loop();
    }
  });

  function loop() {
    window.requestAnimationFrame(loop);
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    if (dotsRef.current) {
      for (var i = 0; i < dotsRef.current.children.length; i++) {
        dotsRef.current.children[i].style.marginTop = `${array[40-i]}px`;
      }
    }
  }

  if (link == '') {
    return <Redirect to="/" />
  }

  if (!props.audio && !props.playing) {
    fetch(`http://localhost:1337/?id=${props.link}`)
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      props.setAudio(decodedAudio);
    })

    return <div>Loading</div>; 
  }

  var dots = new Array(20);
  for (var i = 0; i < 20; i++) {
    dots.push(<li></li>);
  }

  return <ul ref={dotsRef}>{dots}</ul>;
} 

export default Visualizator;