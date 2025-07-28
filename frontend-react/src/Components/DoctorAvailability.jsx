import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DoctorAvailability = ({setDoctorAvailability}) => {
	const [value, setValue] = useState(new Date());

	const availableDates = ["2025-07-15", "2025-07-24", "2025-07-28"];

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
					<select name="doctorlist" className="doctorlist">
						<option value="Dhina">Dhina</option>
						<option value="Ragul">Ragul</option>
						<option value="Guna">Guna</option>
						<option value="Jero">Jero</option>
						<option value="Malar">Malar</option>
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
