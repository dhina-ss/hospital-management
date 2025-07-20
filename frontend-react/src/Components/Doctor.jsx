import React from 'react'

const Doctor = () => {
  return (
    <>
        <div className="patient-container">
            <div className="patient-title">
                <h5>Doctors List</h5>
                <h5>Total Doctors: 23</h5>
            </div>
            <div className="patient-table">
                <table>
                    <tbody>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>specialization</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Dr. Malaran</td>
                            <td>Male</td>
                            <td>25</td>
                            <td>Dermatologist</td>
                            <td><button className='btn btn-success w-100'>View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Doctor
