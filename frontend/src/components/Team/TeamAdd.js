import './style.css';
import React, { useState, useEffect } from "react";
import {addTeam, addDetail} from '../../services/team';
import {fetchAdmin, fetchScrum} from '../../services/project';
import {isAdmin, isScrumMaster, userData} from '../../services/auth';
import { Alert } from "@material-ui/lab";

export default function TeamAdd({onTeamAdd}) {
  const [errormsg, setErrormsg] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [teamName, setTeamName] = useState("");   
  const [projectSelect, setProjectSelect] = useState("");   
  const [projects, setProjects] = useState([]);   

  const closeAlert = (time) => {
    setTimeout(() => {
      setErrormsg("");
      setSuccessmsg("");
    }, time);
  };
  
  const saveTeam = () => {
    if(!teamName || !projectSelect){  
      setErrormsg('Imcomplete Data');
      closeAlert(3000);
    } else {
      let team = {name: teamName, projectId: projectSelect};
      addTeam(team).then(response => {
        setSuccessmsg('Team add successful');
        closeAlert(3000);
        onTeamAdd(response.data.teamResult);
        if ( isScrumMaster()) {
          let data = { userId: userData()._id , teamId: response.data.teamResult._id };
          addDetail(data).then(response => {
            console.log(response.data);
          });
        };

      });
    };
  };

  const listProjects = () => {
    if( isAdmin() ) {
      fetchAdmin().then(response => {
        let projectTrue = response.data.projects.filter( project => project.active);
        setProjects(projectTrue);
        console.log(projectTrue);
      })
    }
    if( isScrumMaster() ) {
      fetchScrum().then(response => {
        let projectTrue = response.data.projects.filter( project => project.active);
        setProjects(projectTrue);
        console.log(projectTrue);
      })
    }
    
  }

  useEffect(()=> listProjects(),[] )
  
    return (
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="exampleModalLabel">Add Team</h2>
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
              onChange = {(event) => setTeamName(event.target.value)}
              value = {teamName}             />
            <br />
            <label htmlFor="exampleInputEmail1">Project</label>
            <select
              className="form-select"
              aria-label="Default select example"
              placeholder="project"
              onChange = {(event) => setProjectSelect(event.target.value)}
              value = {projectSelect} 
            >
              <option selected>Open this select menu</option>
              {projects && (projects.map((project) =>(
               <option key={Math.random()} value= {project._id}>
                 {project.name}
               </option>
            )))}
            </select>
            <br />
            <button type="button" onClick={() => saveTeam()} className="btn btn-success">
              Save
            </button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>

  );
}
