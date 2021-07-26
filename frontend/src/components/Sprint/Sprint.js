import "./style.css";
import React, { useState, useEffect } from "react";
import { updateSprint } from "../../services/board";
import { Alert } from "@material-ui/lab";

export default function Sprint({ sprint }) {
  const [errormsg, setErrormsg] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [sprintName, setSprintName] = useState("");
  const [sprintDescription, setSprintDescription] = useState("");

  const sprintEdit = () => {
    let data = {
      _id: sprint._id,
      name: sprintName,
      description: sprintDescription,
      teamId: sprint.teamId,
      status: sprint.status,
      active: sprint.active,
    };
    updateSprint(data).then(res => {
      setSuccessmsg("Sprint update successful");
      closeAlert(3000);   
    }).catch((err) => {
      errormsg("Sprint update failed");
      closeAlert(3000); 
    })

  };

  function init() {
    setSprintName(sprint.name);
    setSprintDescription(sprint.description);
  }

  const closeAlert = (time) => {
    setTimeout(() => {
      setErrormsg("");
      setSuccessmsg("");
    }, time);
  };

  useEffect(() => init(), [sprint]);

  return (
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="exampleModalLabel">
            Sprint
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
            onChange={(event) => setSprintName(event.target.value)}
            value={sprintName}
          />
          <br />
          <label htmlFor="">Description</label>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => setSprintDescription(event.target.value)}
            value={sprintDescription}
          />
          <br />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => sprintEdit()}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
