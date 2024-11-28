import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './PatientsPage.css';


const PatientsPage = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('/api/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="patients-page">
            <h1>Patients</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Prenom</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {patients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.nom}</td>
                        <td>{patient.prenom}</td>
                        <td>{patient.age}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientsPage;
