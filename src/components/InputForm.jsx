import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import ExportOptions from './ExportOptions';
function InputForm({ 
  userData, 
  onUpdateData, 
  onAddProject, 
  onUpdateProject, 
  onRemoveProject 
}) {
  const [activeTab, setActiveTab] = useState('personal');
  const handleInputChange = (field, value) => {
    onUpdateData(field, value);
  };
  return (
    <div className="input-form">
      <div className="form-tabs">
        <button 
          className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button 
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          className={`tab ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          Export
        </button>
      </div>
      {activeTab === 'personal' && (
        <div className="form-section">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Title / Role</label>
            <input
              type="text"
              value={userData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div className="form-group">
            <label>About Me</label>
            <textarea
              value={userData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              placeholder="Brief description about yourself"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Skills (comma-separated)</label>
            <textarea
              value={userData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              placeholder="JavaScript, React, Node.js, Python"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
          <div className="form-group">
            <label>GitHub Profile</label>
            <input
              type="url"
              value={userData.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              placeholder="https://github.com/yourusername"
            />
          </div>
          <div className="form-group">
            <label>LinkedIn Profile</label>
            <input
              type="url"
              value={userData.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
        </div>
      )}
      {activeTab === 'projects' && (
        <div className="form-section">
          <div className="projects-header">
            <h3>Projects</h3>
            <button className="add-project-btn" onClick={onAddProject}>
              Add Project
            </button>
          </div>  
          {userData.projects.map((project) => (
            <ProjectForm
              key={project.id}
              project={project}
              onUpdate={onUpdateProject}
              onRemove={onRemoveProject}
            />
          ))}
        </div>
      )}
      {activeTab === 'export' && (
        <ExportOptions userData={userData} />
      )}
    </div>
  );
}
export default InputForm;