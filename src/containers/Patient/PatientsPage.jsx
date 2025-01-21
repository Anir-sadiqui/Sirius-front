// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import axios from '../../axios';
import "./PatientsPage.css";

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('id'); // Default sorting field

    const navigate = useNavigate(); // Utiliser useNavigate

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        axios.get('/api/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error(error));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = () => {
        const sortedPatients = [...patients].sort((a, b) => {
            if (sortField === 'id') return a.id - b.id;
            if (sortField === 'nom') return a.nom.localeCompare(b.nom);
            if (sortField === 'age') return a.age - b.age;
            return 0;
        });
        setPatients(sortedPatients);
        setSortField(sortField === 'id' ? 'nom' : sortField === 'nom' ? 'age' : 'id'); // Toggle field
    };

    const filteredPatients = patients.filter(patient =>
        `${patient.nom} ${patient.prenom}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="patients-page">
            <h1>Patients</h1>
            <div className="actions-row">
                <button
                    onClick={() => navigate('/register')} // Redirection vers la page RegisterForm
                    className="add-button"
                >
                    Add Patient
                </button>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-field"
                />
                <button onClick={handleSort} className="sort-button">
                    Sort by {sortField}
                </button>
            </div>

            {/* Patients Table */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredPatients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.nom}</td>
                        <td>{patient.prenom}</td>
                        <td>{patient.age}</td>
                        <td>
                            <button onClick={() => console.log('Edit logic here')}>Edit</button>
                            <button onClick={() => console.log('Delete logic here')}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientsPage;
