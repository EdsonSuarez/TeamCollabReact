import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import Login from '../Login';
import Board from '../../Board/Board';
import Home from '../Home';
import ListRole from "../../Admin/List-role/ListRole";
import Project from '../../Project';
import {logout} from '../../../services/auth';
import ListUser from "../../Admin/List-user/ListUser";


export default function Header() {
    let history = useHistory();

    const logoutFun =()=>{
        logout()
        // history.push("/login");            
    }    

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/* <a className="nav-link active" aria-current="page" href="#"><Link to="/">Home</Link></a> */}
                            <Link to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#"><Link to="/board">Board</Link></a> */}
                            <Link to="/board">Board</Link>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link">Pricing</a> */}
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link disabled" tabIndex="-1" aria-disabled="true">Disabled</a> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/listRoles">List Roles</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/listUsers">List Users</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">                    
                    <button className="btn btn-outline-success" ><Link to="/login">Login</Link></button>
                    <button className="btn btn-outline-success" >Register</button>
                    <button className="btn btn-outline-success" onClick={logoutFun}>Logout <Link to="/login"></Link></button>
                </div>
            </div>
        </nav>
        
        <Switch>
            <Route path="/listUsers">
                <ListUser />
            </Route>
            <Route path="/listRoles">
                <ListRole />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/board">
                <Board />
            </Route>
            <Route path="/project">
                <Project />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            </Switch>
        </>
    );
}

