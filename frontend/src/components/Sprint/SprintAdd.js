import "./style.css";
import React, { useState } from "react";
import { addSprint } from "../../services/board";
import { Alert } from "@material-ui/lab";

export default function SprintAdd({ onSprintAdd }) {
  const [errormsg, setErrormsg] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [sprintName, setSprintName] = useState("");
  const [sprintDescription, setSprintDescription] = useState("");

  const saveSprint = () => {
    console.log(sprintName);
    console.log(sprintDescription);
    if (!sprintName || !sprintDescription) {
      setErrormsg("Imcomplete Data");
      closeAlert(3000);
    } else {
      let teamId = localStorage.getItem('team');
      let data = {name: sprintName, description: sprintDescription, teamId: teamId}
      addSprint(data).then( response => {
        onSprintAdd(response.data.result);  
        setSuccessmsg("Sprint add successful");
        closeAlert(3000);    
      });
    }

  };

  const closeAlert = (time) => {
    setTimeout(() => {
      setErrormsg("");
      setSuccessmsg("");
    }, time);
  };

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
        <div className="container alertaTask">
              {successmsg !== "" ? (
                <Alert
                  variant="outlined"
                  severity="success"
                  className="alertaTask"
                  onClose={() => closeAlert(0)}
                >
                  {successmsg}
                </Alert>
              ) : (
                <></>
              )}

              {errormsg !== "" ? (
                <Alert
                  variant="outlined"
                  severity="error"
                  className="alertaTask"
                  onClose={() => closeAlert(0)}
                >
                  {errormsg}
                </Alert>
              ) : (
                <></>
              )}
            </div>
      
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
          className="form-control"
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
