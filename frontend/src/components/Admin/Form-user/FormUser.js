import React, { useEffect, useState } from "react";
import "./style.css";
import { listRoles } from "../../../services/admin";
import { Alert } from "@material-ui/lab";

export default function FormUser({
  userData,
  successMessage,
  errorMessage,
  closeX,
  isEditing,
}) {
  const [rolesData, setRolesData] = useState([]);

  const handleUser = (event) => {
    event.preventDefault();
    
  };

  return (
    <>
      <form
        className={
          isEditing
            ? "modal-dialog modal-dialog-centered modal-dialog-scrollable"
            : "row row-cols-lg-auto g-3 align-items-center"
        }
        id="userFormModal"
      >
        <legend>{isEditing ? "Edit User" : "Register User"}</legend>
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
        <div className="container">
          <div className="row justify-content-center">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={userData.fullName}
            ></input>
          </div>
          <div className="row justify-content-center">
            <input
              type="email"
              placeholder="Email"
              required
              value={userData.email}
            ></input>
          </div>
          <div className="row justify-content-center">
            <input
              type="password"
              placeholder="Password"
              required
              value={userData.password}
            ></input>
          </div>
          <div className="row justify-content-center">
            <select className="form-select">
              <option selected>Choose...</option>
              {rolesData.map((rol) => (
                <option value={rol._id} key={rol._id}>
                  {rol.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <button>{isEditing ? "Update" : "Register"}</button>
            </div>
            <div className="col-lg-6">
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
