import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthPage from './containers/Patient/AuthPage';
import Dashboard from './containers/Patient/Dashboard';
import MainContent from './components/Home/MainContent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PatientsPage from './containers/Patient/PatientsPage'; // Adjusted to match your structure
import QuizContainer from "./containers/Quiz/QuizContainer.jsx";
import RendezVousContainer from "./containers/RendezVous/RendezVousContainer.jsx"

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/main" element={<MainContent />} />
                    <Route path="/dashboard"
                        element={
                            localStorage.getItem('userEmail')
                                ? <Dashboard />
                                : <Navigate to="/" replace />
                        }
                    />
                    {/* Define your routes */}
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/quiz" element={<QuizContainer />} />
                    <Route path="/rendezvous" element={<RendezVousContainer />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;