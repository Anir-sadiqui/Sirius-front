// ProfilePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
    const location = useLocation();
    const { patientName } = location.state || {}; // Access the patientName from the state

    return (
        <div>
            <h1>Hello {patientName || 'Guest'}</h1>
        </div>
    );
};

export default ProfilePage;