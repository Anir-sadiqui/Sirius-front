import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/Home/MainContent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PatientsPage from './containers/Patient/PatientsPage'; // Adjusted to match your structure
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizContainer from "./containers/Quiz/QuizContainer.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {/* Define your routes */}
                    <Route path="/" element={<MainContent />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/quiz" element={<QuizContainer />} /> {/* Route for the Quiz */}
                    {/* Catch-all route for unmatched paths */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
