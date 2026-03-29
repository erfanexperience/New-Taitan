import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JasonPage from './pages/JasonPage';
import DaniellePage from './pages/DaniellePage';
import TeamPage from './pages/TeamPage';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/jason" element={<JasonPage />} />
        <Route path="/danielle" element={<DaniellePage />} />
      </Routes>
    </>
  );
}
