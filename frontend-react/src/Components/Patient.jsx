import React from 'react'

const Patient = () => {
  return (
    <>
        <div className="patient-container">
            <div className="patient-title">
                <h5>Patients List</h5>
                <h5>Total Patients: 23</h5>
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
                            <th>Consultation Date</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Dhinakaran</td>
                            <td>Male</td>
                            <td>25</td>
                            <td>Dr. Malaran</td>
                            <td>23-05-2024</td>
                            <td><button className='btn btn-success w-100'>View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Patient
