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
          <div className="col-12 col-lg-12">
            <div
              className="alert alert-info alert-dismissible alertJustify d-flex"
              role="alert"
            >
              <div className="alert-message">
                {}
              </div>
              &nbsp;&nbsp;
              <button
                type="button"
                className="close alertButton"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">X</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Name Team"
            />
            <br />
            <select
              className="form-select"
              aria-label="Default select example"
              placeholder="project"
            >
              <option>
                {}
              </option>
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
