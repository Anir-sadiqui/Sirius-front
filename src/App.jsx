import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import PatientsPage from './components/PatientsPage'; // Assuming you have this component

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {/* Define your routes */}
                    <Route path="/" element={<MainContent />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    {/* Catch-all route for unmatched paths */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
