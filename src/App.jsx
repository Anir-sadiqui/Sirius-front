import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/Home/MainContent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PatientsPage from './containers/Patient/PatientsPage'; // Page des patients
import RendezVousPage from './containers/RendezVous/RendezVousPage'; // Ajout de la page de rendez-vous
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {/* Définir vos routes */}
                    <Route path="/" element={<MainContent />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/rendezvous" element={<RendezVousPage />} /> {/* Ajout de la route pour les rendez-vous */}
                    {/* Route catch-all pour les chemins non définis */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
