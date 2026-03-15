import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JasonPage from './pages/JasonPage';
import DaniellePage from './pages/DaniellePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jason" element={<JasonPage />} />
      <Route path="/danielle" element={<DaniellePage />} />
    </Routes>
  );
}
