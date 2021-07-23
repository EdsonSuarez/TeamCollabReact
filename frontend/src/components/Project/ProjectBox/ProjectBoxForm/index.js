import './styles.css';
import { useEffect, useState } from "react";

export default function ProjectBoxForm({
  title,
  _id,
  name,
  description,
  status,
  date,
  active,
  onProjectBoxFormClose,
  onProjectBoxFormSave,
}) {
  const [dataForm, setDataForm] = useState({
    _id: "",
    name: "",
    description: "",
    status: "",
    date: "",
    active: "",
  });
  const [message, setMessage] = useState(null);

  const handleClickForm = () => {
    if(dataForm.name === '' || dataForm.description === '') {
      setMessage("missing fields to fill");
    } else {
      setMessage(null);
      onProjectBoxFormSave(dataForm);
    }
  };

  useEffect(() => {
    setDataForm({
      _id: _id,
      name: name,
      description: description,
      status: status,
      date: date,
      active: active,
    });
  }, [_id]);

  return (
    <div className="card cardProjectBoxForm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="row">
          <input
            className="form-control"
            placeholder="Name"
            value={dataForm.name}
            onChange={({ target: { value } }) =>
              setDataForm({ ...dataForm, name: value })
            }
          />
        </div>
        <div className="row mt-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={dataForm.description}
            onChange={({ target: { value } }) =>
              setDataForm({ ...dataForm, description: value })
            }
          ></textarea>
        </div>
        {_id !== "" && (
          <div className="row m-2">
            <div className="col-lg-12">Status</div>
            <div className="col-lg-4">
              <button
                className={
                  dataForm.status === "doing"
                    ? "btn bg-warning"
                    : "btn btn-light"
                }
                onClick={() => setDataForm({ ...dataForm, status: "doing" })}
              >
                Doing
              </button>
            </div>
            <div className="col-lg-4">
              <button
                className={
                  dataForm.status === "done"
                    ? "btn bg-success"
                    : "btn btn-light"
                }
                onClick={() => setDataForm({ ...dataForm, status: "done" })}
              >
                Done
              </button>
            </div>
            <div className="col-lg-4">
              <button
                className={
                  dataForm.status === "to-do"
                    ? "btn bg-danger"
                    : "btn btn-light"
                }
                onClick={() => setDataForm({ ...dataForm, status: "to-do" })}
              >
                To-do
              </button>
            </div>
          </div>
        )}
        <div className="row mt-2">
          <div className="col-lg-6">
            <button
              className="btn btn-info"
              onClick={() => handleClickForm()}
            >
              {_id === '' ? 'Save' : 'Update'}
            </button>
          </div>
          <div className="col-lg-6">
            <button
              className="btn btn-danger"
              onClick={() => onProjectBoxFormClose(false)}
            >
              Cancel
            </button>
          </div>
        </div>
        { message &&
          <div className="row">
            <div className="col-lg-12">
              <div
                className="alert alert-danger d-flex justify-content-center m-2"
                role="alert"
              >
                { message }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
