import React, { useState, useEffect } from 'react';
import './Visualizator.css';
import { Redirect } from'react-router-dom';

function Visualizator(props) {
  const { link, audio, setAudio } = props;
  const { context, src, isPlaying, isStopped, isComplete, isSkipped, playSound, analyser } = audio;

  console.log(audio);
  var durationRef = React.createRef();
  var dotsRef = React.createRef();
  
  useEffect(() => {
    if (src && !isPlaying && !isComplete) {
      playSound.buffer = src;
      playSound.connect(analyser);
      analyser.connect(context.destination);
      playSound.start(context.currentTime);
      setAudio({context, src, isPlaying: true, isStopped, isComplete, isSkipped, playSound, analyser})
      loop();
    }
    if (isPlaying && !isComplete) {
      loop();
    }
  });

  useEffect(() => {
    if (!src) {
      fetch(`http://localhost:1337/?id=${link}`)
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
          context.close();
          var ctx = new AudioContext();
          setAudio({
            context: ctx, 
            src: decodedAudio, 
            isPlaying, 
            isStopped, 
            playSound: ctx.createBufferSource(), 
            analyser: ctx.createAnalyser(),
          });
        })
    }
  })
  
  function loop() {
    var handle = window.requestAnimationFrame(loop);
    console.log(handle);
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    if (dotsRef.current) {
      for (var i = 0; i < 20; i++) {
        dotsRef.current.children[i].style.marginTop = `${array[40-i]}px`;
      }
    }

    if (durationRef.current) {
      durationRef.current.style.height = '10px';
      durationRef.current.style.width = `${(context.currentTime / src.duration) * 1000}px`;
      durationRef.current.style.backgroundColor = 'white';
      durationRef.current.style.display =  'flex';
    }

    if (context.currentTime >= src.duration) {
      window.cancelAnimationFrame(handle);
      setAudio({
        context, 
        src, 
        isPlaying,
        isStopped, 
        isComplete: true,
        isSkipped, 
        playSound, 
        analyser,
      });
    }
  }

  if (link == '') {
    return <Redirect to="/" />
  }
  

  if (!src && !isPlaying) {
    // fetch(`http://localhost:1337/?id=${link}`)
    // .then(data => data.arrayBuffer())
    // .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    // .then(decodedAudio => {
    //   setAudio({
    //     context, 
    //     src: decodedAudio, 
    //     isPlaying, 
    //     isStopped, 
    //     playSound, 
    //     analyser,
    //   });
    // })

    return <div>Loading</div>; 
  }


  var dots = new Array(20);
  for (var i = 0; i < 20; i++) {
    dots.push(<li></li>);
  }

  if (context.currentTime >= src.duration) {
    setAudio({
      context: new AudioContext(), 
      src, 
      isPlaying, 
      isStopped, 
      isComplete: true,
      isSkipped,
      playSound, 
      analyser,
    })
  } else {
    console.log(isComplete);
  }

  return (
    <div>
      <ul ref={dotsRef}>{dots}</ul>
    </div>
  );
} 

export default Visualizator;