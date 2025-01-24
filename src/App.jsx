import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthPage from './containers/Patient/AuthPage';
import Dashboard from './containers/Patient/Dashboard';
import MainContent from './components/Home/MainContent';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/main" element={<MainContent />} />
                    <Route
                        path="/dashboard"
                        element={
                            localStorage.getItem('userEmail')
                                ? <Dashboard />
                                : <Navigate to="/" replace />
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;