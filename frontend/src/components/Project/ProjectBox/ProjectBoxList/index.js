import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { isUserLeader } from "../../../../services/auth";
import moment from "moment";

export default function ProjectBoxList({
  _id,
  name,
  description,
  status,
  date,
  active,
  onProjectBoxListEdit,
  onProjectBoxListDelete,
}) {
  const createData = (_id, name, description, status, date, active) => {
    const objForm = {
      _id: _id,
      name: name,
      description: description,
      status: status,
      date: date,
      active: active,
    };
    onProjectBoxListDelete(objForm);
  };

  return (
    <div
      className={`card m-2 cardProjectBoxList ${
        active ? "card-success" : "card-secondary"
      }`}
      style={{ width: "18rem" }}
    >
      <div className="card-header">{name}</div>
      <div className="card-body">
        <p className="card-text text-justify">{description}</p>
        <div className="row">
          <h5 className="card-title text-start">
            Status:
            <span
              className={`badge text-dark ${
                status === "done"
                  ? "bg-success"
                  : status === "doing"
                  ? "bg-warning"
                  : "bg-danger"
              }`}
            >
              {status}
            </span>
          </h5>
        </div>
        <div className="row">
          <h5 className="card-title text-start">
            Date: {moment(date).format("DD-MM-yyyy")}
          </h5>
        </div>
        <div className="row">
          <h5 className="card-title text-start">
            <span
              className={`badge text-dark ${
                active ? "bg-success" : "bg-warning"
              }`}
            >
              {active ? "Active" : "Deleted"}
            </span>
          </h5>
        </div>
        {!isUserLeader() && (
          <>
            <button
              className="btn btn-warning btn-xs m-1"
              title="Editar proyecto"
              disabled={!active}
              onClick={() =>
                onProjectBoxListEdit(
                  _id,
                  name,
                  description,
                  status,
                  date,
                  active
                )
              }
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="btn btn-danger btn-xs m-1"
              title="Borrar proyecto"
              disabled={!active}
              onClick={() =>
                createData(_id, name, description, status, date, active)
              }
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}

        <Link to={`/board/${_id}`} className="btn btn-info btn-xs m-1" onClick={() => localStorage.setItem('project', _id)}>
          <FontAwesomeIcon icon={faChalkboardTeacher} />
        </Link>
      </div>
    </div>
  );
}
