import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import piechart from "../assets/Graph.png"
import Patient from "./Patient";
import Doctor from "./Doctor";

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('dashboard');
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
                            <a onClick={()=>{setActiveItem('dashboard')}} className={activeItem === 'dashboard'? 'menu-active': ''}>Dashboard</a>   
                            <a onClick={()=>{setActiveItem('patient')}} className={activeItem === 'patient'? 'menu-active': ''}>Patients</a>   
                            <a onClick={()=>{setActiveItem('doctor')}} className={activeItem === 'doctor'? 'menu-active': ''}>Doctors</a>   
                            <a onClick={()=>{setActiveItem('staff')}} className={activeItem === 'staff'? 'menu-active': ''}>Staff</a>   
                            <a onClick={()=>{setActiveItem('admin')}} className={activeItem === 'admin'? 'menu-active': ''}>Admin</a>   
                        </div>
                    </div>
                    <div className="col-9 p-0">
                        {activeItem === 'patient' && <Patient/>}
                        {activeItem === 'doctor' && <Doctor/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
