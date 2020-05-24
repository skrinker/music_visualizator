import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './InsertLink.css';

function InsertLink(props) {

  function submitHandler(event) {
    event.preventDefault();
  }

  function changeHandler(event) {
    props.setLink(event.target.value);
  }
  return(
    <div className="container">
      <div className="input-form">
      <form onSubmit={submitHandler}>
        <input onChange={changeHandler} placeholder="Paste youtube video link">
        </input>
      </form>
      <Link to="/visualizator"><button>Visualize</button></Link>
      </div>
      <div className="line"></div>
      <div className="text">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
}

export default InsertLink;