
import PropTypes from 'prop-types'
import DeleteModal from '../modal/DeleteModal';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookingDataRow = ({ booking,getData }) => {
    const [isOpen,setIsOpen]=useState(false)
    const closeModal=()=>{
        setIsOpen(false)
  
    }

    //handle delete
    const handleDelete=async()=>{
        try{
            await axios.delete(`${import.meta.env.VITE_API_URL}/booking/${booking._id}`)
            toast.success("Booking deleted successfully")
            closeModal()
            // refresh the data
            getData()
        }catch(err){
            console.log(err)
            toast.error("Failed to delete booking")
        }
    }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            {/* <div className='block relative'>
              <img
                alt='profile'
                src={booking?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div> */}
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{booking?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            {/* <div className='block relative'>
              <img
                alt='profile'
                src={booking?.guest?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div> */}
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>
              {booking?.guest?.name}
            </p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${booking?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
         
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
        
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={()=>setIsOpen(true)} span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </button>
      </td>
      {/* delete Modal */}
      <DeleteModal isOpen={isOpen} handleDelete={handleDelete} closeModal={closeModal}></DeleteModal>
    </tr>
  )
}

BookingDataRow.propTypes = {
  booking: PropTypes.object,
  refetch: PropTypes.func,
}

export default BookingDataRow