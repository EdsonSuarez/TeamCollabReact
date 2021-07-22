import './style.css';
import React, { useState, useEffect } from "react";
import {getUsers, deleteDetail, addDetail} from '../../services/team';
import {listUsersAll} from '../../services/user';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Sprint({team}) {
    const sprintEdit = () => {
        console.log(team);
    }

    return (
    
<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title" id="exampleModalLabel">Sprint</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <br />
        <label for="">Description</label>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <br />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={() => sprintEdit()}>
          Save changes
        </button>
      </div>
    </div>
  </div>



    

  );
}
