import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Visualizator from './Visualizator';
import InsertLink from './InsertLink';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";


function App(props) {
  const [link, setLink] = useState('');
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  return (
  <Router>
    <Switch>
      <Route path="/visualizator">
        <Visualizator link={link} setPlaying={setPlaying} playing={playing} audio={audio} setAudio={setAudio} />
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
