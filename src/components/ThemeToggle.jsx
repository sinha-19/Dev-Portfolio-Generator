import React from 'react';
function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
export default ThemeToggle;