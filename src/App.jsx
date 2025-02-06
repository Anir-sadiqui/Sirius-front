import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home/Home";
import MainContent from "./components/Home/MainContent";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import SearchBar from "./components/SearchBar/SearchBar";
import MedecinList from "./components/MedecinList/MedecinList";
import Calendrier from "./components/Calendrier/Calendrier";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow">
                    <Routes>
                        {/* Page d'accueil avec le contenu principal */}
                        <Route path="/" element={<MainContent />} />

                        {/* Page principale avec recherche et liste des médecins */}
                        <Route path="/main" element={<MainContent />} />

                        {/* Page de rendez-vous */}
                        <Route path="/rendezvous" element={<Home />} />

                        {/* Page de recherche */}
                        <Route path="/search" element={<SearchBar />} />

                        {/* Page de liste des médecins */}
                        <Route path="/medecins" element={<MedecinList />} />

                        {/* Page du calendrier des disponibilités avec ID médecin */}
                        <Route path="/calendrier/:medecinId" element={<Calendrier />} />

                        {/* Page 404 - Page Not Found */}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
};

export default App;

