
import Nab from '../components/Nab';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="container mx-auto  min-h-[calc(100vh-68px)]P">
            <Nab></Nab>
            <div className=" min-h-[calc(100vh-68px)]P">
            <Outlet ></Outlet>
            </div>
            
        </div>
    );
};

export default MainLayout;