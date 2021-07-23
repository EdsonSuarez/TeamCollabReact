import React, { useState } from "react";
import FormUser from "../Form-user/FormUser";

export default function RegisterUser() {
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="form">
      <FormUser userData={userData} isEditing={isEditing} />
    </div>
  );
}
