import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/Home/MainContent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PatientsPage from './containers/Patient/PatientsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizContainer from "./containers/Quiz/QuizContainer.jsx";
import RendezVousContainer from "./containers/RendezVous/RendezVousContainer.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/patients" element={<PatientsPage />} />
                        <Route path="/quiz" element={<QuizContainer />} />
                        <Route path="/rendezvous" element={<RendezVousContainer />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;