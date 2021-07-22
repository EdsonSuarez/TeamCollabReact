import './style.css';
import React, { useState, useEffect } from "react";
import {getUsers, deleteDetail, addDetail} from '../../services/team';
import {listUsersAll} from '../../services/user';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faAngleRight, faAngleLeft, faListAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function TeamAdd() {

    const saveTeam = ()  => {

    }
    
    return (
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">Add Team</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="col-12 col-lg-12">
            <div
              class="alert alert-info alert-dismissible alertJustify d-flex"
              role="alert"
            >
              <div class="alert-message">
                {}
              </div>
              &nbsp;&nbsp;
              <button
                type="button"
                class="close alertButton"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">X</span>
              </button>
            </div>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Name Team"
            />
            <br />
            <select
              class="form-select"
              aria-label="Default select example"
              placeholder="project"
            >
              <option>
                {}
              </option>
            </select>
            <br />
            <button type="button" onClick={() => saveTeam()} class="btn btn-success">
              Save
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>

  );
}
