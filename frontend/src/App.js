import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import Header from "./components/home/Header";
import Login from "./components/home/Login"
import { getPosts } from "./actions/posts";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
    <Router>
        <Header/>
    </Router>
    <footer>Pequeño footer</footer>
    </>
  );
}

export default App;
