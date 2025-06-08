import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { FiDownload, FiCode, FiImage, FiDatabase } from 'react-icons/fi';
function ExportOptions({ userData }) {
  const [isExporting, setIsExporting] = useState(false);
  const generateHTML = () => {
    const skillsArray = userData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.name} - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #16a085 0%, #27ae60 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .header h2 {
            font-size: 1.2em;
            opacity: 0.9;
        }
        .section {
            padding: 30px;
            border-bottom: 1px solid #eee;
        }
        .section:last-child {
            border-bottom: none;
        }
        .section h3 {
            color: #16a085;
            margin-bottom: 20px;
            font-size: 1.5em;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .skill {
            background: #e8f8f5;
            color: #16a085;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
        }
        .projects {
            display: grid;
            gap: 20px;
        }
        .project {
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 20px;
            background: #fafafa;
        }
        .project h4 {
            color: #333;
            margin-bottom: 10px;
        }
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin: 10px 0;
        }
        .tech {
            background: #f0f0f0;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
        }
        .links {
            margin-top: 15px;
        }
        .links a {
            color: #16a085;
            text-decoration: none;
            margin-right: 15px;
        }
        .links a:hover {
            text-decoration: underline;
        }
        .social-links {
            text-align: center;
            margin-top: 20px;
        }
        .social-links a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            opacity: 0.9;
        }
        .social-links a:hover {
            opacity: 1;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>${userData.name}</h1>
            <h2>${userData.title}</h2>
            <div class="social-links">
                ${userData.email ? `<a href="mailto:${userData.email}">Email</a>` : ''}
                ${userData.github ? `<a href="${userData.github}" target="_blank">GitHub</a>` : ''}
                ${userData.linkedin ? `<a href="${userData.linkedin}" target="_blank">LinkedIn</a>` : ''}
            </div>
        </header>
        <section class="section">
            <h3>About Me</h3>
            <p>${userData.about}</p>
        </section>
        <section class="section">
            <h3>Skills</h3>
            <div class="skills">
                ${skillsArray.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
        </section>
        <section class="section">
            <h3>Projects</h3>
            <div class="projects">
                ${userData.projects.map(project => `
                    <div class="project">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                        ${project.techStack ? `
                            <div class="tech-stack">
                                ${project.techStack.split(',').map(tech => `<span class="tech">${tech.trim()}</span>`).join('')}
                            </div>
                        ` : ''}
                        <div class="links">
                            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank">GitHub</a>` : ''}
                            ${project.demoLink ? `<a href="${project.demoLink}" target="_blank">Live Demo</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        <section class="section">
            <h3>Contact</h3>
            <p>Feel free to reach out for collaborations or just a friendly hello!</p>
            ${userData.email ? `<p><strong>Email:</strong> <a href="mailto:${userData.email}">${userData.email}</a></p>` : ''}
        </section>
    </div>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userData.name.replace(/\s+/g, '_')}_portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const exportAsImage = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('portfolio-preview');
      if (element) {
        const dataUrl = await toPng(element, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#ffffff'
        });    
        const link = document.createElement('a');
        link.download = `${userData.name.replace(/\s+/g, '_')}_portfolio.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Error exporting image. Please try again.');
    }
    setIsExporting(false);
  };
  const exportAsJSON = () => {
    const jsonData = JSON.stringify(userData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userData.name.replace(/\s+/g, '_')}_portfolio_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="export-options">
      <h3>Export Your Portfolio</h3>
      <p>Choose how you'd like to export your portfolio:</p>  
      <div className="export-buttons">
        <button className="export-btn" onClick={generateHTML}>
          <FiCode />
          <span>Export as HTML</span>
          <small>Standalone HTML file</small>
        </button>
        <button 
          className="export-btn" 
          onClick={exportAsImage}
          disabled={isExporting}
        >
          <FiImage />
          <span>{isExporting ? 'Exporting...' : 'Export as PNG'}</span>
          <small>High-quality image</small>
        </button>
        <button className="export-btn" onClick={exportAsJSON}>
          <FiDatabase />
          <span>Export Data (JSON)</span>
          <small>Save your data</small>
        </button>
      </div>
      <div className="export-info">
        <h4>Export Information:</h4>
        <ul>
          <li><strong>HTML:</strong> Creates a standalone portfolio website</li>
          <li><strong>PNG:</strong> High-quality image of your portfolio</li>
          <li><strong>JSON:</strong> Your data in JSON format for backup</li>
        </ul>
      </div>
    </div>
  );
}
export default ExportOptions;