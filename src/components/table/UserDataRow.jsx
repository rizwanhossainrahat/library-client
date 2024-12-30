import PropTypes from 'prop-types'
import UpdateUserModal from '../modal/UpdateUserModal'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
const UserDataRow = ({ user,refetch}) => {
    const[isOpen,setIsOpen]=useState(false)
    const {user:loggedInUser}=useAuth()

    
    const {mutateAsync}=useMutation({
        mutationFn:async role=>{
            const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/users/update/${user?.email}`,role)
            return data
        },
        onSuccess:data=>{
            refetch()
            console.log(data);
            toast.success('User role Updated Successfully')
            setIsOpen(false)
        }
    })

     //modal handler
     const modalHandler=async selected=>{
       
        if(user?.status==='Verified') return toast.error(`user don't want to change there role`)
        
        if(loggedInUser?.email ===user?.email){
            toast.error('You can not change your own role')
            return
        }

        const userRole={
            role:selected,
            status:'Verified'
        }
        try{
            const data=await mutateAsync(userRole)
            console.log(data);
        }
        catch (err){
            toast.error(err.message)
        }
    }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={()=>setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal modalHandler={modalHandler}  setIsOpen={setIsOpen} user={user} isOpen={isOpen}></UpdateUserModal>
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow