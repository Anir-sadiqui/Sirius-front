import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/Home/MainContent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PatientsPage from './containers/Patient/PatientsPage';
import RegisterForm from './containers/Patient/RegisterForm.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./containers/Patient/Dashboard.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
