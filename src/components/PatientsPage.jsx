// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './PatientsPage.css';

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // Controls modal visibility
    const [modalType, setModalType] = useState(''); // 'add' or 'edit'
    const [currentPatient, setCurrentPatient] = useState({ id: '', nom: '', prenom: '', age: '' });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        axios.get('/api/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error(error));
    };

    const handleOpenModal = (type, patient = { id: '', nom: '', prenom: '', age: '' }) => {
        setModalType(type);
        setCurrentPatient(patient);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentPatient({ id: '', nom: '', prenom: '', age: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentPatient({ ...currentPatient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modalType === 'add') {
            axios.post('/api/patients', currentPatient)
                .then(() => {
                    fetchPatients();
                    handleCloseModal();
                })
                .catch(error => console.error(error));
        } else if (modalType === 'edit') {
            axios.put(`/api/patients/${currentPatient.id}`, currentPatient)
                .then(() => {
                    fetchPatients();
                    handleCloseModal();
                })
                .catch(error => console.error(error));
        }
    };

    const handleDeletePatient = (id) => {
        axios.delete(`/api/patients/${id}`)
            .then(() => fetchPatients())
            .catch(error => console.error(error));
    };

    return (
        <div className="patients-page">
            <h1>Patients</h1>
            <button onClick={() => handleOpenModal('add')} className="add-button">Add Patient</button>

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
                {patients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.nom}</td>
                        <td>{patient.prenom}</td>
                        <td>{patient.age}</td>
                        <td>
                            <button onClick={() => handleOpenModal('edit', patient)}>Edit</button>
                            <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for Add/Edit */}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{modalType === 'add' ? 'Add Patient' : 'Edit Patient'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="nom"
                                value={currentPatient.nom}
                                onChange={handleInputChange}
                                placeholder="Nom"
                                required
                            />
                            <input
                                type="text"
                                name="prenom"
                                value={currentPatient.prenom}
                                onChange={handleInputChange}
                                placeholder="Prenom"
                                required
                            />
                            <input
                                type="number"
                                name="age"
                                value={currentPatient.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                                required
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleCloseModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientsPage;
