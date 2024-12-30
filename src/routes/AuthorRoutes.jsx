
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import useRole from '../components/hooks/useRole';
import { Navigate } from 'react-router-dom';

const AuthorRoutes = ({children}) => {
    const[role,isLoading]=useRole()
    
    if(isLoading) return<LoadingSpinner></LoadingSpinner>
    if(role==='author') return children
   return <Navigate to='/dashboard'></Navigate>
   
};

export default AuthorRoutes;