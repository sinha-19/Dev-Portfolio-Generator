import React from 'react';
import { FiMail, FiExternalLink, FiFolder, FiUser } from 'react-icons/fi';
function PortfolioPreview({ userData, theme }) {
  const skillsArray = userData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
  return (
    <div className={`portfolio-preview ${theme}`} id="portfolio-preview">
      <header className="portfolio-header">
        <div className="profile-info">
          <div className="profile-image">
            <div className="placeholder-avatar">
              {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          </div>
          <div className="profile-text">
            <h1>{userData.name || 'Your Name'}</h1>
            <h2>{userData.title || 'Your Title'}</h2>
          </div>
        </div>
        <div className="social-links">
          {userData.email && (
            <a href={`mailto:${userData.email}`} target="_blank" rel="noopener noreferrer">
              <FiMail /> Email
            </a>
          )}
          {userData.github && (
            <a href={userData.github} target="_blank" rel="noopener noreferrer">
              <FiFolder /> GitHub
            </a>
          )}
          {userData.linkedin && (
            <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">
              <FiUser /> LinkedIn
            </a>
          )}
        </div>
      </header>
      <section className="portfolio-section">
        <h3>About Me</h3>
        <p>{userData.about || 'Tell us about yourself...'}</p>
      </section>
      <section className="portfolio-section">
        <h3>Skills</h3>
        <div className="skills-grid">
          {skillsArray.length > 0 ? (
            skillsArray.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))
          ) : (
            <p className="placeholder">Add your skills...</p>
          )}
        </div>
      </section>
      <section className="portfolio-section">
        <h3>Projects</h3>
        <div className="projects-grid">
          {userData.projects.length > 0 ? (
            userData.projects.map((project) => (
              <div key={project.id} className="project-card">
                <h4>{project.title || 'Project Title'}</h4>
                <p>{project.description || 'Project description...'}</p>
                {project.techStack && (
                  <div className="tech-stack">
                    {project.techStack.split(',').map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <FiFolder /> Code
                    </a>
                  )}
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink /> Demo
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="placeholder">Add your projects...</p>
          )}
        </div>
      </section>
      <section className="portfolio-section">
        <h3>Get In Touch</h3>
        <p>Feel free to reach out for collaborations or just a friendly hello!</p>
        <div className="contact-info">
          {userData.email && (
            <a href={`mailto:${userData.email}`} className="contact-link">
              <FiMail /> {userData.email}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
export default PortfolioPreview;