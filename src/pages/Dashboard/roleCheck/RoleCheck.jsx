
import { useEffect, useState } from 'react';
import useRole from '../../../components/hooks/useRole';
import ShowUser from '../admin/ShowUser';
import ShowBookings from '../reader/ShowBookings';

import useAuth from '../../../components/hooks/useAuth';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const RoleCheck = () => {
    const[role]=useRole()
    const{user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const [booking,setBooking]=useState([])

    const getData=async()=>{
        try{
            const result=await axiosSecure(`${import.meta.env.VITE_API_URL}/booking/${user?.email}`)
            setBooking(result.data)
        }
        catch(err){
            toast.error(err.message);
        }
    }

    
    useEffect(()=>{
        getData()
    },[user?.email])

    return (
        <div>
            {role==="reader" &&  <ShowBookings getData={getData} booking={booking}></ShowBookings>}
           {role==="admin" && <ShowUser></ShowUser>}

        </div>
    );
};

export default RoleCheck;