import { useState, useEffect } from "react";
import { fetchAdmin, fetchScrum, fetchUserLeader } from "../../services/project";
import { isAdmin, isScrumMaster, isUserLeader } from "../../services/auth";
import { saveProject, updateProject, deleteProject } from "../../services/project";

import ProjectBox from "./ProjectBox";

export default function Project() {
  const objForm = {
    _id: "",
    show: false,
    title: "New project",
    name: "",
    description: "",
    status: "",
    date: "",
    active: ""
  };
  const [projects, setProjects] = useState();
  const [projectsSearch, setProjectsSearch] = useState();
  const [showForm, setShowForm] = useState(objForm);
  const [message, setMessage] = useState();

  const inicio = () => {
    if (isAdmin()) listAdmin();
    if(isScrumMaster()) listScrum();
    if(isUserLeader()) listUserLeader();
    if(localStorage.getItem('sprint') && localStorage.getItem('team')) {
      localStorage.removeItem('team');
      localStorage.removeItem('sprint');
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
    fetchUserLeader().then(({ data: { projects } }) => {
      setShowForm(objForm);
      setProjects(projects);
      setProjectsSearch(projects);
    });
  };

  const handleProjectBoxFormSave = (dataSave) => {
    if(dataSave._id === '') {
      saveProject(dataSave).then(({ data: { result } }) => {
        setShowForm(objForm);
        setProjects([...projects, result]);
      });
    } else {
      updateProject(dataSave).then(({ data: { project } }) => {
        setShowForm(objForm);
        setProjects(projects.map((item) => (item._id === project._id ? project : item)));
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

  const handleProjectBoxListEdit = (_id, name, description, status, date, active) => {
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
      setProjects(projects.map((item) => (item._id === project._id ? project : item)));
    });
  };

  const handleProjectBoxSearch = (search) => {
    search = search.trim().toLowerCase();
    setProjects(search === '' ? projectsSearch : projects.filter((value) => value.name.toLowerCase().indexOf(search) > -1));
  };

  useEffect(() => inicio(), []);

  return (
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
  );
}
