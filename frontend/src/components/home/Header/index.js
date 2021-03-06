import React, { useState, useEffect } from "react";
import "./styles.css";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import Login from "../Login";
import Board from "../../Board/Board";
import Home from "../Home";
import ListRole from "../../Admin/List-role/ListRole";
import Project from "../../Project";
import ListUser from "../../Admin/List-user/ListUser";
import RegisterUser from "../../Admin/Register-user/RegisterUser";

import img1 from "../../../assets/img/teamCollab.png";
import { isAdmin } from "../../../services/auth";
import { useDispatch } from "react-redux";
import { exit } from "../../../actions/home";
import Register from "../Register/Register";

export default function Header() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [change, setChange] = useState();
  const [logueado, setLogueado] = useState();
  const [admin, setAdmin] = useState();

  const logoutFun = () => {
    dispatch(exit());
    setChange(false);
    history.push("/login");
  };

  const handleLogin = (value) => {
    setChange(value);
  };

  useEffect(() => {
    setAdmin(!!isAdmin());
    setLogueado(!!localStorage.getItem("token"));
  }, [change]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="nav-link" style={{ color: "white" }} to="/">
            <span className="navbar-brand" href="/">
              <img src={img1} alt="" />
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {logueado && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "white" }}
                      to="/board"
                    >
                      Board
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "white" }}
                      to="/project"
                    >
                      Projects
                    </Link>
                  </li>
                </>
              )}

              {admin && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "white" }}
                      to="/listRoles"
                    >
                      List Roles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "white" }}
                      to="/listUsers"
                    >
                      List Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "white" }}
                      to="/registerUser"
                    >
                      Register User
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="d-flex">
            {!logueado ? (
              <>
                <button className="btn btn-light">
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Login
                  </Link>
                </button>
                <button className="btn btn-light" style={{ color: "black" }}>
                  <Link
                    className="nav-link"
                    style={{ color: "black" }}
                    to="/register"
                  >
                    Register
                  </Link>
                </button>
              </>
            ) : (
              <button
                className="btn btn-light"
                style={{ color: "black" }}
                onClick={logoutFun}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/registerUser">
          <RegisterUser />
        </Route>
        <Route path="/listUsers">
          <ListUser />
        </Route>
        <Route path="/listRoles">
          <ListRole />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login onLogin={handleLogin} />
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
