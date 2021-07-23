import React, { useState } from "react";
import FormUser from "../Form-user/FormUser";

export default function EditUser({ userData, rolesData }) {
  const [isEditing, setIsEditing] = useState(false);
  const editUser = () => {
    setIsEditing(true);
  };
  return (
    <>
      <div
        className="modal fade"
        id="modalUser"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                Edit User
              </h2>
            </div>
            <FormUser
              userData={userData}
              rolesData={rolesData}
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>
      <button
        id="task-user"
        data-bs-toggle="modal"
        data-bs-target="#modalUser"
        className="col-1 btn btn-primary"
        onClick={() => editUser()}
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
    </>
  );
}

{
  /* <div
  className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
  id="userFormModal"
></div>; */
}
