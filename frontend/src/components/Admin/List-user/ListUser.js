import React, { useEffect, useState } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { listUsers, deleteUser, updateUser } from "../../../services/admin";
import { Alert } from "@material-ui/lab";
import { blue, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: blue,
  },
}));

export default function ListUser() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    listUsers()
      .then((response) => {
        console.log(response);
        setUsers(response.data.user);
      })
      .catch((response) => {
        setErrorMessage(response.data);
        closeAlert();
      });
  }, []);

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

  const deleteUserr = (user) => {
    if (user.active === false)
      return setErrorMessage("This user is already deleted");
    deleteUser(user)
      .then((response) => {
        user.active = false;
        setSuccessMessage("User deleted");
        closeAlert();
      })
      .catch((response) => {
        setErrorMessage("Error deleting user");
        closeAlert();
      });
  };

  const editUser = (user) => {
    setIsEditing(true);
  };

  const saveUser = (user) => {
    updateUser(user)
      .then((response) => {
        setSuccessMessage("Successful, user updated");
        closeAlert();
        setIsEditing(false);
      })
      .catch((response) => {
        setErrorMessage("Error updating user");
        closeAlert();
        setIsEditing(false);
      });
  };

  return (
    <div className="container bg-component">
      <div className="accordion_display">
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
        <div className="accordion-sm" id="accordionUsers">
          {users.map((user) => (
            <div key={user._id} className="accordion-item">
              <h3 className="accordion-header" id={"heading" + user._id}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#collapse" + user._id}
                  aria-expanded="true"
                  aria-controls={"collapse" + user._id}
                >
                  {user.fullName}
                </button>
              </h3>
              <div
                id={"collapse" + user._id}
                className="accordion-collapse collapse show"
                aria-labelledby={"heading" + user._id}
                data-bs-parent="#accordionUsers"
              >
                <div className="row accordion-body">
                  <p className="col">
                    <span className={user.active ? "active" : "deactive"}>
                      {user.active ? "activo" : "inactivo"}
                    </span>
                  </p>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="userFormModal"
                    onClick={() => editUser(user)}
                    className="col-1 btn btn-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteUserr(user)}
                    className="col-1 btn btn-danger"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* <AccordionActions>
                <RestoreIcon
                  style={{ color: blue[900], cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="userFormModal"
                  onClick={() => editUser(user)}
                />
                <DeleteIcon
                  style={{ color: red[900], cursor: "pointer" }}
                  onClick={() => deleteUser(user)}
                />
              </AccordionActions> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
