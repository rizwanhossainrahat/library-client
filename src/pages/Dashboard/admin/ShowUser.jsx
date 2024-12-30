import { useEffect, useState } from "react";
import useAuth from "../../../components/hooks/useAuth";
import UserDataRow from "../../../components/table/UserDataRow";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


const ShowUser = () => {
    const {user:loggedInUser}=useAuth()
    
    // fetch all user 
    const {
        data: users = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/users`)
          return data
          console.log(data);
        },
      })

     

    console.log(users);

    return (
        <div>
            <h1 className="flex justify-center">Admin DashBoard </h1>
            {
                users.map(user=><UserDataRow refetch={refetch}  key={user?._id} user={user}></UserDataRow>)
            }
        </div>
    );
};

export default ShowUser;