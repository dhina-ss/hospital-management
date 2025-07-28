import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DoctorAvailability from './DoctorAvailability';

const PatientDetails = ({ id, goBack }) => {
    const [patientId, setPatientId] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [assignedDoctor, setAssignedDoctor] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [consultationDetails, setConsultationDetails] = useState('');
    const [password, setPassword] = useState('');
    const [doctorAvailability, setDoctorAvailability] = useState(false);

    useEffect(() => {
        const getPatientData = async () => {
            try {
                const accessToken = localStorage.getItem('access');
                const response = await axios.get(`http://localhost:8000/api/v1/patient/${id}/`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const data = response.data;
                setPatientId(data.id);
                setName(data.username);
                setGender(data.gender);
                setDateOfBirth(data.dateofbirth);
                setAge(data.age);
                setEmail(data.email);
                setMobileNumber(data.mobilenumber);
                setAssignedDoctor(data.assigned_doctor);
                setAppointmentDate(data.appointment_date);
                setConsultationDetails(data.consultation_details);
                setPassword(data.password);
            } catch (error) {
                if (error.response?.data?.code === 'token_not_valid') {
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    alert('Session expired. Please log in again.');
                } else {
                    console.log(error.response?.data || error.message);
                }
            }
        };
        getPatientData();
    }, [id]);

    return (
        <>
            <div className="patient-details-container">
                <div className="breadcrumb">
                    <a>Home</a>/ <a>Patients</a>/ <a>{patientId}</a>
                </div>
                <button className="btn btn-secondary mb-3 ms-3" onClick={goBack}>← Back to List</button>
                <form>
                    <div className='input-group mb-md-3'>
                        <label>Name: </label>
                        <input className='rounded' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='input-group mb-md-3'>
                        <label>Gender: </label>
                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <div className='input-group mb-md-3'>
                        <label>Date of Birth: </label>
                        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                    </div>
                    <div className='input-group mb-md-3'>
                        <label>Age: </label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className='input-group mb-md-3'>
                        <label>Email: </label>
                        <input className='rounded' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input-group mb-md-3'>
                        <label>Mobile Number: </label>
                        <input className='rounded' type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                    </div>
                    <div className='input-group mb-md-3'>
                        <label>Assigned Doctor: </label>
                        <input className='rounded pe-none' type="text" value={assignedDoctor || 'Not Assigned'} readOnly />
                        <button className='btn btn-info ms-md-3 rounded' type="button" onClick={() => setDoctorAvailability(true)}>
                            Assign Doctor
                        </button>
                    </div>
                    <div className='input-group mb-md-3'>
                        <label>Appointment Date: </label>
                        <input className='rounded' type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
                    </div>
                    <div className='input-group mb-md-3 align-items-start'>
                        <label>Consultation Details: </label>
                        <textarea className='rounded pe-none' value={consultationDetails || ''} onChange={(e) => setConsultationDetails(e.target.value)} readOnly></textarea>
                    </div>
                    <div className='input-group mb-md-3'>
                        <label>Password: </label>
                        <input className='rounded' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </form>
            </div>

            {doctorAvailability && <DoctorAvailability setDoctorAvailability={setDoctorAvailability} />}
        </>
    );
};

export default PatientDetails;
