import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patient = ({ onView }) => {
    const [patients, setPatients] = useState([]);
    const accessToken = localStorage.getItem("access");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientResponse = await axios.get("http://localhost:8000/api/v1/patients/", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setPatients(patientResponse.data);
            } catch (error) {
                if (error.response?.data?.code === 'token_not_valid') {
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    window.location.href = '/login';
                } else {
                    console.log(error.response?.data);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="patient-container">
                <div className="patient-title">
                    <h5>Patients List</h5>
                    <h5>Total Patients: {patients.length}</h5>
                    <button className="btn btn-secondary">Add</button>
                </div>
                <div className="patient-table">
                    <table>
                        <tbody>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Assigned Doctor</th>
                                <th>Appointment Date</th>
                                <th>Action</th>
                            </tr>
                            {patients.map((item, idx) => (
                                <tr key={item.id || idx}>
                                    <td>{idx + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.gender || ''}</td>
                                    <td>{item.age || ''}</td>
                                    <td>{item.assigned_doctor || 'Not Assigned'}</td>
                                    <td>{item.appointment_date || '-'}</td>
                                    <td>
                                        <button
                                            className="btn btn-success w-100"
                                            type="button"
                                            onClick={() => onView(item.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Patient;