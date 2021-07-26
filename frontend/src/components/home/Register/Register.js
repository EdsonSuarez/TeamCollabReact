import React from "react";
import FormUser from "../../Admin/Form-user/FormUser";
import "./style.css"
import { registerUser } from "../../../services/auth"

export default function Register() {
  return (
    <div className="all">
      <div className="izq">
          <FormUser registerUser={registerUser}/>
      </div>

      <div className="der">
        <div className="fondo"></div>
      </div>
    </div>
  );
}
