import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from '../Login';
import Board from '../../Board/Board';
import Home from '../Home';

export default function Header() {

    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><Link to="/">Home</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"><Link to="/board">Board</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
                <form class="d-flex">                    
                    <button class="btn btn-outline-success" type="submit"><Link to="/login">Login</Link></button>
                    <button class="btn btn-outline-success" type="submit">Register</button>
                </form>
            </div>
        </nav>
        
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/board">
                <Board />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            </Switch>
        </>
    );
}

