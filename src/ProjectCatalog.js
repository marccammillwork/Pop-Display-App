import React, { useState } from 'react';

const ProjectCatalog = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project A', status: 'Completed' },
    { id: 2, name: 'Project B', status: 'In Progress' },
  ]);

  return (
    <div className="container">
      <div className="formContainer">
        <h1 className="title">Project Catalog</h1>
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              {project.name} - {project.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCatalog;
