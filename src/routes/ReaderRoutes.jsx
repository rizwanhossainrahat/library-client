

import useRole from '../components/hooks/useRole';
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const ReaderRoutes = ({children}) => {
    const[role,isLoading]=useRole()
    console.log(role);
    if(isLoading) return<LoadingSpinner></LoadingSpinner>
    if(role==="reader") return children
   return <Navigate to='/dashboard'></Navigate>
};

export default ReaderRoutes;