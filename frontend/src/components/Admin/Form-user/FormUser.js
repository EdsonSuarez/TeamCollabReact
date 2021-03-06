import React, { useEffect, useState } from "react";
import "./style.css";
import { Alert } from "@material-ui/lab";
import { listRoles, listUsers } from "../../../services/admin";
import { Link } from "@material-ui/core";
// import ListUsers from "../../../components/Admin/List-user/ListUser";
// import Login from "../../../components/home//Login/index";

export default function FormUser({
  userData = { fullName: "", email: "", password: "", roleId: "" },
  isEditing,
  rolesData = null,
  registerUser,
  isAdmin,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(userData);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (isEditing === true) {
      listRoles()
        .then((response) => {
          setRoles(response.data.roles);
        })
        .catch((response) => {
          setErrorMessage("Roles don´t found");
          closeAlert();
        });
      setUser(userData);
    } else {
      setRoles(rolesData);
    }
  }, [userData, user]);

  const handleUser = (event) => {
    event.preventDefault();
    registerUser(user)
      .then((response) => {
        setSuccessMessage("User saved");
        closeAlert();
        if (isEditing || isAdmin) {
          <Link to="/listUsers"/>;
        } else {
         <Link to="/login"/>
        }
      })
      .catch((response) => {
        setErrorMessage("Error, user don´t saved");
        closeAlert();
      });
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
      <form onSubmit={handleUser} className="formContainer">
        <div className={isEditing ? "modal-header" : "text-center"}>
          <h2 className="modal-title" id="exampleModalLabel">
            {isEditing ? "Edit User" : "Register User"}
          </h2>
        </div>
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
        <div className={isEditing ? "modal-body" : "container"}>
          <div
            className={
              isEditing ? "row justify-content-center" : "form-control"
            }
          >
            <input
              className={isEditing ? "form-control" : "input-form"}
              type="text"
              placeholder="Full Name"
              required
              value={user.fullName}
              onChange={({ target: { value } }) =>
                setUser({ ...user, fullName: value })
              }
            ></input>
          </div>
          <div
            className={
              isEditing ? "row justify-content-center" : "form-control"
            }
          >
            <input
              className={isEditing ? "form-control" : "input-form"}
              type="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={({ target: { value } }) =>
                setUser({ ...user, email: value })
              }
            ></input>
          </div>
          <div
            className={
              isEditing ? "row justify-content-center" : "form-control"
            }
          >
            <input
              className={isEditing ? "form-control" : "input-form"}
              type="password"
              placeholder="Password"
              required
              value={user.password}
              onChange={({ target: { value } }) =>
                setUser({ ...user, password: value })
              }
            ></input>
            <span></span>
          </div>
          {roles !== null ? (
            <div
              className={
                isEditing ? "row justify-content-center" : "form-control"
              }
            >
              <select
                className="form-select"
                onChange={({ target: { value } }) =>
                  setUser({ ...user, roleId: value })
                }
              >
                {user.roleId ? "" : <option selected>Choose...</option>}
                {roles.map((rol) => (
                  <option value={rol.name} key={rol._id}>
                    {rol.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}
          <div className={isEditing ? "modal-footer" : "container-button"}>
            <div className="col-lg-6">
              <button
                type="submit"
                className={isEditing ? "btn btn-primary" : "button colorButton"}
              >
                {isEditing ? "Update" : "Register"}
              </button>
            </div>
            <div className="col-lg-6">
              <button
                type="button"
                className={isEditing ? "btn btn-secondary" : "button bg-danger"}
                data-bs-dismiss="modal"
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
