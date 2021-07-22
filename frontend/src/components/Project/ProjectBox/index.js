import "./styles.css";
import ProjectBoxList from "./ProjectBoxList";
import ProjectBoxForm from "./ProjectBoxForm";
import ProjectBoxSearch from "./ProjectBoxSearch";
import { isUserLeader } from "../../../services/auth";

export default function ProjectBox({
  projects,
  onProjectBoxSave = (params) => params,
  objForm,
  onProjectBoxClose = (params) => params,
  onProjectBoxNew,
  onProjectBoxEdit = (params) => params,
  onProjectBoxDelete = (params) => params,
  onProjectBoxSearch = (params) => params,
}) {
  return (
    <div className="card cardBorderUnset cardProjectBox">
      <div className="card-header text-center projectTitle">
        <div className="col-lg-12">
          <div className="form-group">Projects</div>
          {!isUserLeader() && (
            <div className="form-group float-end">
              <button
                type="button"
                className="btn btn-warning btn-sm projectButton"
                onClick={onProjectBoxNew}
              >
                New
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card-body">
        <div className="col-lg-12 text-center">
          <ProjectBoxSearch onProjectBoxSearch={onProjectBoxSearch} />
          <div className="row">
            <div className={!objForm.show ? "col-lg-12" : "col-lg-6"}>
              <div className="row justify-content-center">
                {projects?.map((project) => (
                  <ProjectBoxList
                    key={project._id}
                    {...project}
                    onProjectBoxListEdit={onProjectBoxEdit}
                    onProjectBoxListDelete={onProjectBoxDelete}
                  />
                ))}
              </div>
            </div>
            {objForm.show && (
              <div className="col-lg-6">
                <ProjectBoxForm
                  {...objForm}
                  onProjectBoxFormClose={onProjectBoxClose}
                  onProjectBoxFormSave={onProjectBoxSave}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
