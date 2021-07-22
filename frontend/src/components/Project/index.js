import { useState, useEffect } from "react";
import { fetchProjects } from "../../services/project";
import { isAdmin } from "../../services/auth";

import ProjectBox from "./ProjectBox";

export default function Project() {
  const [projects, setProjects] = useState();

  const inicio = () => {
    if (isAdmin()) {
      fetchProjects().then(({ data: { projects } }) => {
        setProjects(projects);
      });
    }
  };

  useEffect(() => inicio(), []);

  return <ProjectBox projects={projects} />;
}
