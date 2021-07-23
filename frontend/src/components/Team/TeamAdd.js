import './style.css';
import React, { useState, useEffect } from "react";
import {addTeam, addDetail} from '../../services/team';
import {fetchAdmin, fetchScrum} from '../../services/project';
import {isAdmin, isScrumMaster, userData} from '../../services/auth';

export default function TeamAdd() {
  const [message, setMessage] = useState("");   
  const [teamName, setTeamName] = useState("");   
  const [projectSelect, setProjectSelect] = useState("");   
  const [projects, setProjects] = useState([]);   

  const saveTeam = () => {
    if(!teamName || !projectSelect){  
      setMessage('Imcomplete Data');
      closeAlert();
    } else {
      let team = {name: teamName, projectId: projectSelect};
      addTeam(team).then(response => {
        setMessage('Team add successful');
        closeAlert();
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

  function closeAlert() {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  function closeX() {
    setMessage('');
  }

  
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
          {message && (<div className="col-12 col-lg-12" >
            <div
              className="alert alert-info alert-dismissible alertJustify d-flex"
              role="alert"
            >
              <div className="alert-message">
                {message}
              </div>
              &nbsp;&nbsp;
              <button
                type="button"
                className="close alertButton"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => closeX()}
              >
                <span aria-hidden="true">X</span>
              </button>
            </div>
          </div>)}
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Name Team"
              onChange = {(event) => setTeamName(event.target.value)}
              value = {teamName}             />
            <br />
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
