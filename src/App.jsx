import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import PortfolioPreview from './components/PortfolioPreview';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import { defaultUserData } from './data/defaultUserData';
import './styles/App.css';
function App() {
  const [userData, setUserData] = useState(defaultUserData);
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedData) {
      try {
        setUserData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(userData));
  }, [userData]);
  useEffect(() => {
    localStorage.setItem('portfolioTheme', theme);
    document.body.className = theme;
  }, [theme]);
  const updateUserData = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      description: '',
      techStack: '',
      githubLink: '',
      demoLink: ''
    };
    setUserData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };
  const updateProject = (projectId, field, value) => {
    setUserData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? { ...project, [field]: value }
          : project
      )
    }));
  };
  const removeProject = (projectId) => {
    setUserData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== projectId)
    }));
  };
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>Developer Portfolio Generator</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>  
      <main className="app-main">
        <div className="input-section">
          <InputForm
            userData={userData}
            onUpdateData={updateUserData}
            onAddProject={addProject}
            onUpdateProject={updateProject}
            onRemoveProject={removeProject}
          />
        </div>
        <div className="preview-section">
          <PortfolioPreview userData={userData} theme={theme} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;