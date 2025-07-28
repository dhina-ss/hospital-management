import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Patient from "./Patient";
import Doctor from "./Doctor";
import PatientDetails from "./PatientDetails";
import axios from "axios";
import DoctorAvailability from "./DoctorAvailability";

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const navigate = useNavigate();
    try {
        const accessToken = localStorage.getItem('access')
        if (!accessToken) {
            navigate('/login')
        };
    } catch (error) {
        console.log(error)
    }
    return (
        <>
            <div className="dashboard-container">
                <div className="row">
                    <div className="col-3 menu-bar">
                        <div className="menu-title">
                            <FiMenu size={22} />
                            <h2 className="mb-0">Menu</h2>
                        </div>
                        <div className="menu-links">
                            <a onClick={() => { setActiveItem('dashboard') }} className={activeItem === 'dashboard' ? 'menu-active' : ''}>Dashboard</a>
                            <a onClick={() => { setActiveItem('patient') }} className={activeItem === 'patient' ? 'menu-active' : ''}>Patients</a>
                            <a onClick={() => { setActiveItem('doctor') }} className={activeItem === 'doctor' ? 'menu-active' : ''}>Doctors</a>
                            <a onClick={() => { setActiveItem('staff') }} className={activeItem === 'staff' ? 'menu-active' : ''}>Staff</a>
                            <a onClick={() => { setActiveItem('admin') }} className={activeItem === 'admin' ? 'menu-active' : ''}>Admin</a>
                        </div>
                    </div>
                    <div className="col-9 p-0 menu-content">
                        {activeItem === 'patient' && (
                            selectedPatientId
                                ? <PatientDetails id={selectedPatientId} goBack={() => setSelectedPatientId(null)} />
                                : <Patient onView={(id) => setSelectedPatientId(id)} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
