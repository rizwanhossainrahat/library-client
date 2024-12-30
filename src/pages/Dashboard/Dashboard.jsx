import { Outlet } from "react-router-dom";
import Profile from "../../components/Profile";

import RoleCheck from "./roleCheck/RoleCheck";


const Dashboard = () => {
    return (
        <div>
            <RoleCheck></RoleCheck>
            <Outlet></Outlet>
            <Profile></Profile>
            
        </div>
    );
};

export default Dashboard;