import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Login from '../Login';
import Board from '../../Board/Board';
export default function Header() {

  return (
    <>
    <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/board">Board</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </div>
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/board">
                <Board />
            </Route>
            <Route path="/">
                {/* <Home /> */}
            </Route>
        </Switch>
    </>
  );
}

