import "./styles.css";
import { useSelector } from "react-redux";
import ProjectBoxList from "./ProjectBoxList";
import ProjectBoxForm from "./ProjectBoxForm";
import { useState } from "react";

export default function ProjectBox({ projects }) {
  const [showForm, setShowForm] = useState({
    show: false,
    type: false,
    title: "New project",
    name: "",
    description: "",
    status: "",
  });

  const handleClick = () => {
    setShowForm({

    });
  };

  const handleProjectBoxFormClose = (action) => {
    setShowForm(action);
  };

  return (
    <div className="card cardBorderUnset">
      <div className="card-header text-center projectTitle">
        <div className="col-lg-12">
          <div className="form-group">Projects</div>
          <div className="form-group float-end">
            <button
              type="button"
              className="btn btn-warning btn-sm projectButton"
              onClick={() => handleClick()}
            >
              New
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="col-lg-12 text-center">
          <div className="row">
            <input
              type="search"
              className="form-control"
              placeholder="Filter by project name"
            />
          </div>
          <div className="row">
            <div className={!showForm ? "col-lg-12" : "col-lg-6"}>
              <div className="row justify-content-center">
                {projects?.map((project) => (
                  <ProjectBoxList key={project._id} {...project} />
                ))}
              </div>
            </div>
            <div className={showForm && "col-lg-6"}>
              {showForm && (
                <ProjectBoxForm
                  onProjectBoxFormClose={handleProjectBoxFormClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
