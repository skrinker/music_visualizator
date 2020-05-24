import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Visualizator from './Visualizator';
import InsertLink from './InsertLink';
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

const ctx = new AudioContext();

function App(props) {
  const [link, setLink] = useState('');
  const [audio, setAudio] = useState({
    context: new AudioContext(),
    src: null,
    isPlaying: false,
    isStopped: false,
    isComplete: false,
    isSkipped: false,
    playSound: (new AudioContext()).createBufferSource(),
    analyser: (new AudioContext()).createAnalyser()
  });
  return (
  <Router>
    <Switch>
      <Route path="/visualizator">
        <Visualizator link={link} audio={audio} setAudio={setAudio} />
      </Route>
      <Route path="/">
        <InsertLink setLink={setLink} />
      </Route>
    </Switch>
  </Router>);
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
