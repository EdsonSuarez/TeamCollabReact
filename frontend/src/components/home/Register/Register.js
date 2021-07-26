import React from "react";
import FormUser from "../../Admin/Form-user/FormUser";
import "./style.css"

export default function Register() {
  return (
    <div className="all mb-5">
      <div className="izq">
          <FormUser />
      </div>

      <div className="der">
        <div className="fondo"></div>
      </div>
    </div>
  );
}
