import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-header">{name}</div>
      <div className="card-body">
        <p className="card-text text-justify">{description}</p>
        <div className="row">
          <h5 className="card-title text-start">
            Status:
            <span>{status}</span>
          </h5>
        </div>
        <div className="row">
          <h5 className="card-title text-start">Date: {date}</h5>
        </div>
        <div className="row">
          <h5 className="card-title text-start">
            <span className="badge text-dark">
              {active ? "Active" : "Deleted"}
            </span>
          </h5>
        </div>
        <button
          className="btn btn-warning btn-xs m-1"
          title="Editar proyecto"
          onClick={() =>
            onProjectBoxListEdit(_id, name, description, status, date, active)
          }
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="btn btn-danger btn-xs m-1"
          title="Borrar proyecto"
          onClick={() =>
            createData(_id, name, description, status, date, active)
          }
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
