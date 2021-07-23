import { useState, useEffect } from "react";
import {
  fetchAdmin,
  fetchScrum,
  fetchUserLeader,
} from "../../services/project";
import { isAdmin, isScrumMaster, isUserLeader } from "../../services/auth";
import {
  saveProject,
  updateProject,
  deleteProject,
} from "../../services/project";

import ProjectBox from "./ProjectBox";
import Alerts from "./Alerts";

export default function Project() {
  const objForm = {
    _id: "",
    show: false,
    title: "New project",
    name: "",
    description: "",
    status: "",
    date: "",
    active: "",
  };
  const [projects, setProjects] = useState();
  const [projectsSearch, setProjectsSearch] = useState();
  const [showForm, setShowForm] = useState(objForm);
  const [alertDetail, setAlertDetail] = useState({
    show: false,
    type: "",
    message: "",
  });

  const inicio = () => {
    if (isAdmin()) listAdmin();
    if (isScrumMaster()) listScrum();
    if (isUserLeader()) listUserLeader();
    if (localStorage.getItem("sprint") && localStorage.getItem("team")) {
      localStorage.removeItem("team");
      localStorage.removeItem("sprint");
    }
  };

  const listAdmin = () => {
    fetchAdmin().then(({ data: { projects } }) => {
      setShowForm(objForm);
      setProjects(projects);
      setProjectsSearch(projects);
    });
  };

  const listScrum = () => {
    fetchScrum().then(({ data: { projects } }) => {
      setShowForm(objForm);
      setProjects(projects);
      setProjectsSearch(projects);
    });
  };

  const listUserLeader = () => {
    fetchUserLeader().then(({ data: { team } }) => {
      let projects = [];
      team.map(({ teamId }) => {
        if (teamId !== null) {
          projects.push(teamId.projectId);
        }
      });
      setShowForm(objForm);
      setProjects(projects);
      setProjectsSearch(projects);
    });
  };

  const handleProjectBoxFormSave = (dataSave) => {
    if (dataSave._id === "") {
      saveProject(dataSave).then(({ data: { result } }) => {
        setShowForm(objForm);
        setProjects([...projects, result]);
        alertCtrl("success", "Project created with success!");
      });
    } else {
      updateProject(dataSave).then(({ data: { project } }) => {
        setShowForm(objForm);
        setProjects(
          projects.map((item) => (item._id === project._id ? project : item))
        );
        alertCtrl("success", "Project updated with success!");
      });
    }
  };

  const handleProjectBoxFormClose = (action) => {
    objForm.show = action;
    setShowForm(objForm);
  };

  const handleProjectBoxNew = () => {
    objForm.show = true;
    setShowForm(objForm);
  };

  const handleProjectBoxListEdit = (
    _id,
    name,
    description,
    status,
    date,
    active
  ) => {
    objForm._id = _id;
    objForm.show = true;
    objForm.title = `Edit project: ${name}`;
    objForm.name = name;
    objForm.description = description;
    objForm.status = status;
    objForm.date = date;
    objForm.active = active;
    setShowForm(objForm);
    window.scrollTo(0, 0);
  };

  const handleProjectBoxListDelete = (dataDelete) => {
    deleteProject(dataDelete).then(({ data: { project } }) => {
      setProjects(
        projects.map((item) => (item._id === project._id ? project : item))
      );
      alertCtrl("success", "Project deleted with success!");
    });
  };

  const handleProjectBoxSearch = (search) => {
    search = search.trim().toLowerCase();
    setProjects(
      search === ""
        ? projectsSearch
        : projects.filter(
            (value) => value.name.toLowerCase().indexOf(search) > -1
          )
    );
  };

  const alertCtrl = (type, message) => {
    setAlertDetail({
      ...alertDetail,
      show: true,
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlertDetail({ ...alertDetail, show: false });
    }, 2000);
  };

  useEffect(() => inicio(), []);

  return (
    <>
      <Alerts {...alertDetail} />
      <ProjectBox
        projects={projects}
        onProjectBoxSave={handleProjectBoxFormSave}
        objForm={showForm}
        onProjectBoxClose={handleProjectBoxFormClose}
        onProjectBoxNew={handleProjectBoxNew}
        onProjectBoxEdit={handleProjectBoxListEdit}
        onProjectBoxDelete={handleProjectBoxListDelete}
        onProjectBoxSearch={handleProjectBoxSearch}
      />
    </>
  );
}
