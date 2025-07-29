import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const DoctorAvailability = ({ setDoctorAvailability }) => {
	const [value, setValue] = useState(new Date());
	const [doctorsList, setDoctorsList] = useState([]);
	const [doctorsAppointmentList, setDoctorsAppointmentList] = useState([]);
	const [selectedDoctorId, setSelectedDoctorId] = useState(1);
	const accessToken = localStorage.getItem('access');
	useEffect(() => {
		const getDoctorDetails = async () => {
			try {
				const doctorsResponse = await axios.get('http://localhost:8000/api/v1/doctors/', {
					headers: { Authorization: `Bearer ${accessToken}` }
				});
				const fetchedDoctors = doctorsResponse.data;
				setDoctorsList(fetchedDoctors);

				if (fetchedDoctors.length > 0) {
					setSelectedDoctorId(fetchedDoctors[0].id);
				}
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
		const getDoctorAppointmentDetails = async () => {
			try {
				const doctorsAppointmentResponse = await axios.get('http://localhost:8000/api/v1/doctors-appointments/', {
					headers: { Authorization: `Bearer ${accessToken}` }
				})
				setDoctorsAppointmentList(doctorsAppointmentResponse.data)
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
		getDoctorDetails();
		getDoctorAppointmentDetails();
	}, []);

	useEffect(() => { }, [doctorsList, doctorsAppointmentList]);

	const grouped = {};
	doctorsAppointmentList.forEach(item => {
		const { doctor, appointment_date } = item;
		if (!grouped[doctor]) {
			grouped[doctor] = [];
		}
		grouped[doctor].push(appointment_date);
	});

	const availableDates = grouped[parseInt(selectedDoctorId)] || [];

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = `${date.getMonth() + 1}`.padStart(2, '0');
		const day = `${date.getDate()}`.padStart(2, '0');
		return `${year}-${month}-${day}`;
	};
	const tileClassName = ({ date, view }) => {
		const dateStr = formatDate(date);
		if (view === 'month' && availableDates.includes(dateStr)) {
			return 'available-date';
		}
		return null;
	};

	const tileDisabled = ({ date }) => {
		const dateStr = formatDate(date);
		return availableDates.includes(dateStr);
	};
	return (
		<>
			<div className="doctor-availability-container">
				<div className="doctor-availability-row">
					<div className="close-btn" onClick={() => setDoctorAvailability(false)}>
						<FontAwesomeIcon icon={faCircleXmark} color="#ffffff" />
					</div>
					<select name="doctorlist" className="doctorlist" onChange={(e) => setSelectedDoctorId(e.target.value)}>
						{doctorsList.map((item) => (
							<option key={item.id} value={item.id}>
								Dr. {item.first_name} {item.last_name}
							</option>
						))}
					</select>

					<Calendar
						onChange={setValue}
						value={value}
						tileClassName={tileClassName}
						tileDisabled={tileDisabled}
					/>
					<button className="btn btn-success mt-2">Add</button>
					<div className="color-details">
						<div className="color">
							<div className="avail-color"></div>
							<div>Available</div>
						</div>
						<div className="color">
							<div className="avail-color select-color"></div>
							<div>Selected</div>
						</div>
						<div className="color">
							<div className="avail-color today-color"></div>
							<div>Today</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DoctorAvailability;
