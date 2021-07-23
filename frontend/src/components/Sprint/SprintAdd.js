import "./style.css";
import React, { useState } from "react";

export default function SprintAdd({ onSprintAdd }) {
  const [message, setMessage] = useState("");
  const [sprintName, setSprintName] = useState("");
  const [sprintDescription, setSprintDescription] = useState("");

  const saveSprint = () => {
    console.log(sprintName);
    console.log(sprintDescription);
    if (!sprintName || !sprintDescription) {
       setMessage("Imcomplete Data");
       closeAlert();
    } else {
      let teamId = localStorage.getItem('team');
      console.log(teamId);
      // addBoard().then()
    }

  };
  function closeAlert() {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  function closeX() {
    setMessage("");
  }
  return (
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="exampleModalLabel">
            Add Sprint
          </h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        {message && (  <div className="col-12 col-lg-12">
          <div
            className="alert alert-info alert-dismissible alertJustify d-flex"
            role="alert"
          >
            <div className="alert-message">{message}</div>
            &nbsp;&nbsp;
            <button
              type="button"
              className="close alertButton"
              data-dismiss="alert"
              aria-label="Close"
              onclick={() => closeX()}
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>
        </div>)}
      
        <div className="modal-body">
        <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Name Team"
            onChange = {(event) => setSprintName(event.target.value)}
            value = {sprintName}  
          />
          <br />
          <label htmlFor="exampleInputEmail1">Description</label>
          <textarea
          class="form-control"
          aria-label="With textarea"
          placeholder="Description"
          onChange = {(event) => setSprintDescription(event.target.value)}
          value = {sprintDescription} 
        ></textarea>
          <br />
          <button
            type="button"
            onClick={() => saveSprint()}
            className="btn btn-success"
          >
            Save
          </button>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
