import React, { useState, useEffect } from "react";
import { listRoles, registerUser } from "../../../services/admin";
import FormUser from "../Form-user/FormUser";
import "./style.css";

export default function RegisterUser() {
  const [rolesData, setRolesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    listRoles()
      .then((response) => {
        setRolesData(response.data.roles);
      })
      .catch((response) => {
        console.log("Access denied");
      });
  }, []);

  return (
    <div className="form">
      <div className="cardFormUser">
        <FormUser
          userData={userData}
          isEditing={isEditing}
          rolesData={rolesData}
          registerUser={registerUser}
        />
      </div>
    </div>
  );
}
