import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
function ProjectForm({ project, onUpdate, onRemove }) {
  const handleChange = (field, value) => {
    onUpdate(project.id, field, value);
  };
  return (
    <div className="project-form">
      <div className="project-header">
        <h4>Project #{project.id}</h4>
        <button 
          className="remove-btn"
          onClick={() => onRemove(project.id)}
          title="Remove Project"
        >
          <FiTrash2 />
        </button>
      </div>
      <div className="form-group">
        <label>Project Title</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter project title"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={project.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your project"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Tech Stack</label>
        <input
          type="text"
          value={project.techStack}
          onChange={(e) => handleChange('techStack', e.target.value)}
          placeholder="React, Node.js, MongoDB"
        />
      </div>
      <div className="form-group">
        <label>GitHub Link</label>
        <input
          type="url"
          value={project.githubLink}
          onChange={(e) => handleChange('githubLink', e.target.value)}
          placeholder="https://github.com/username/project"
        />
      </div>
      <div className="form-group">
        <label>Demo Link</label>
        <input
          type="url"
          value={project.demoLink}
          onChange={(e) => handleChange('demoLink', e.target.value)}
          placeholder="https://yourproject.com"
        />
      </div>
    </div>
  );
}
export default ProjectForm;