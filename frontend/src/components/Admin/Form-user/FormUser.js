import React, { useEffect, useState } from "react";
import "./style.css";
import { Alert } from "@material-ui/lab";

export default function FormUser({ userData, isEditing, rolesData = [] }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(userData);

  useEffect(()=> {
    setUser("");
    setSuccessMessage("");
    setErrorMessage("");
  },[])

  const handleUser = (event) => {
    event.preventDefault();
  };

  const closeAlert = () => {
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 500);
  };

  const closeX = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const setDefault = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setUser("");
  };

  return (
    <>
      <form >
        <div className="container alerta">
          {successMessage !== "" ? (
            <Alert
              variant="outlined"
              severity="success"
              className="alerta"
              onClose={() => closeX()}
            >
              {successMessage}
            </Alert>
          ) : (
            <div className="alerta"></div>
          )}

          {errorMessage !== "" ? (
            <Alert
              variant="outlined"
              severity="warning"
              className="alerta"
              onClose={() => closeX()}
            >
              {errorMessage}
            </Alert>
          ) : (
            <div className="alerta"></div>
          )}
        </div>
        <div className="modal-body">
          <div className="row justify-content-center">
            <input
              className="form-control"
              type="text"
              placeholder="Full Name"
              required
              value={user.fullName}
              onChange={({ target: { value } }) => setUser({...user, fullName: value})}
            ></input>
          </div>
          <div className="row justify-content-center">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={({ target: { value } }) => setUser({...user, email: value})}
            ></input>
          </div>
          <div className="row justify-content-center">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              required
              value={user.password}
              onChange={({ target: { value } }) => setUser({...user, password: value})}
            ></input>
          </div>
          {rolesData.length ? (
            <div className="row justify-content-center">
              <select className="form-select">
                {user.roleId ? "" : <option selected>Choose...</option>}
                {rolesData.map((rol) => (
                  <option value={rol._id} key={rol._id}>
                    {rol.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}
          <div className="modal-footer">
            <div className="col-lg-6">
              <button>{isEditing ? "Update" : "Register"}</button>
            </div>
            <div className="col-lg-6">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDefault}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
