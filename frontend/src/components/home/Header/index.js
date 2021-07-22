import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import Login from '../Login';
import Board from '../../Board/Board';
import Home from '../Home';
import ListRole from "../../Admin/List-role/ListRole";
import Project from '../../Project';
import { logout } from '../../../services/auth';
import ListUser from "../../Admin/List-user/ListUser";
import './styles.css';
import img1 from "../../../assets/img/teamCollab.png";
import {isAdmin, isUser, isScrumMaster,loggedIn} from '../../../services/auth';

export default function Header() {
    let history = useHistory();

    const logoutFun = () => {
        logout()
        // history.push("/login");            
    }
    console.log("login", loggedIn())

    return (
        <>            

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src={img1} alt="" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" style={{color:"black"}} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{color:"black"}} to="/board">Board</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{color:"black"}} to="/project">Projectos</Link>
                            </li>    
                            {isAdmin ?
                                <li className="nav-item">
                                    <Link className="nav-link" style={{color:"black"}} to="/listRoles">List Roles</Link>
                                </li>
                                :
                                <span></span>
                            }
                            <li className="nav-item">
                                <Link className="nav-link" style={{color:"black"}} to="/listUsers">List Users</Link>
                            </li>                                            
                        </ul>
                    </div>
                    <div className="d-flex">                    
                        <button className="btn btn-outline-success" style={{color:"black"}}>Register</button>
                        {/* <button className="btn btn-outline-success" style={{color:"black"}} onClick={logoutFun}>Logout</button> */}
                        <button className="btn btn-outline-success" ><Link to="/login" style={{textDecoration:"none", color:"black"}}>Login</Link></button>                        
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

