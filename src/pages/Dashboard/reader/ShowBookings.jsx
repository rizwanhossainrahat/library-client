import toast from "react-hot-toast";
import BookingDataRow from "../../../components/table/BookingDataRow";
import useAuth from "../../../components/hooks/useAuth";
import axios from "axios";


const ShowBookings = ({booking,getData}) => {
    // console.log(booking);
    const {user}=useAuth()
    // console.log(getData());
   
    

    //reader role author change func
    const handleReaderChange=async()=>{
            try{
                const result=await axios.put(`${import.meta.env.VITE_API_URL}/readerChange/${user?.email}`)
                toast.success('Requested  for author role')
                
            }
            catch(error){
                toast.error('Failed to change reader role!')
            }
    }
    return (
        <div className="">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleReaderChange} >Become a author</button>
           
            {
               booking.map(booking=><BookingDataRow key={booking._id} getData={getData} booking={booking}></BookingDataRow>)
            }
        </div>
    );
};

export default ShowBookings;