import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Card from './components/Card';
import CardById from './components/CardById';
import Create from './components/Create';
import Delete from './components/Delete';
import Update from './components/Update';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Card />} />
        <Route path="/:id" element={<CardById />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/delete/:id" element={<Delete />} />
      </Routes>
    </Router>
  )
}

export default App