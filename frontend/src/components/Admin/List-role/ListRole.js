import React, { useEffect, useState } from "react";
import "./style.css";
import { listRoles, deleteRole, activeRole } from "../../../services/admin";
import RestoreIcon from "@material-ui/icons/Restore";
import DeleteIcon from "@material-ui/icons/Delete";
import { Alert } from "@material-ui/lab";
import { blue, red } from "@material-ui/core/colors";

export default function ListRole() {
  const [rolesData, setRolesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    listRoles()
      .then((response) => {
        setRolesData(response.data.roles);
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

  const deleteRol = (role) => {
    if (
      role.name === "admin" ||
      role.name === "user" ||
      role.active === false
    ) {
      role.name === "admin" || role.name === "user"
        ? setErrorMessage("This user cannot be deleted")
        : setErrorMessage("This user is already deleted");
      closeAlert();
    } else {
      deleteRole(role)
        .then((response) => {
          role.active = false;
          setSuccessMessage("Role Delete");
          closeAlert();
        })
        .catch((response) => {
          setErrorMessage("Error deleting role");
          closeAlert();
        });
    }
  };

  const editRole = (role) => {
    if (role.active === true) {
      setErrorMessage("This user is already activated");
      closeAlert();
    } else {
      activeRole(role)
        .then((response) => {
          role.active = true;
          setSuccessMessage("Role activated");
          closeAlert();
        })
        .catch((response) => {
          setErrorMessage("Error updating role");
          closeAlert();
        });
    }
  };

  return (
    <>
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

      {rolesData.length ? (
        <div className="container">
          <div className="tarjetas">
            {rolesData.map((role) => (
              <div key={role._id} className="card text-center">
                <h3 className="text_center">{role.name}</h3>

                <div className="card-body">
                  <span>{role.description}</span>
                </div>
                <div className="actionsContainer">
                  <hr />
                  <div className="actions">
                    <p>
                      <span className={role.active ? "active" : "deactive"}>
                        {role.active ? "activo" : "inactivo"}
                      </span>
                    </p>
                    <span className="spacer"></span>
                    <RestoreIcon
                      style={{ color: blue[900], cursor: "pointer" }}
                      onClick={() => editRole(role)}
                    />
                    <DeleteIcon
                      style={{ color: red[900], cursor: "pointer" }}
                      onClick={() => deleteRol(role)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
