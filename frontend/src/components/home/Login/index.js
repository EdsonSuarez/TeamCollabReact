import "./styles.css";

import { LOGIN } from '../../../constants/actionTypes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/home";
import { setToken } from "../../../helpers/jwt";
import { useHistory } from "react-router-dom";

const MessageError = ({ errorMessage }) => {
  return (
    <div
      className="alert alert-danger d-flex align-items-center m-2"
      role="alert"
    >
      {errorMessage}
    </div>
  );
};

export default function Login() {
  const [error, setError] = useState();
  useSelector(({ homes: { constant, data } }) => {
    if(constant && constant === LOGIN) handleHistory(data);
  });
  const dispatch = useDispatch();
  let history = useHistory();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(dataLogin));
  };

  const handleHistory = (token) => {
    setToken(token);
    history.push("/project");  
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <FontAwesomeIcon icon={faUser} className="iconHead" />
        </div>
        {error && <MessageError errorMessage={error} />}
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center m-2">
            <input
              type="text"
              id="login"
              className="fadeIn second loginInput"
              name="email"
              placeholder="Email"
              required
              value={dataLogin.email}
              onChange={({ target: { value } }) =>
                setDataLogin({ ...dataLogin, email: value })
              }              
            />
          </div>
          <div className="row justify-content-center m-2">
            <input
              type="password"
              id="password"
              className="fadeIn third loginInput"
              name="password"
              placeholder="Password"
              required
              value={dataLogin.password}
              onChange={({ target: { value } }) =>
                setDataLogin({ ...dataLogin, password: value })
              }
            />
          </div>
          <button className="btn btn-pink m-2">Log in</button>
        </form>
        <div id="formFooter">
          <p>¿Don't have an account?</p>
          <button className="btn btn-pink m-2">Register</button>
        </div>
      </div>
    </div>
  );
}
