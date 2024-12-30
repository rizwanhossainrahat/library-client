import axios from "axios";
import { imageUpload } from "../../../api/utils";
import AddbookForm from "../../../components/form/AddbookForm";
import useAuth from "../../../components/hooks/useAuth";
import toast from "react-hot-toast";
import AddedBooklist from "./AddedBooklist";
import { Link, useNavigate } from "react-router-dom";

const AddBooks = () => {
    const{user}=useAuth()
    const navigate=useNavigate()
    //handle book submit form
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const name=e.target.name.value;
        const title=e.target.title.value;
        const image=e.target.image.files[0];
        const price=e.target.price.value;
        const description=e.target.description.value;
        console.log(name,title,image,price,description);
        const author={
            name:user?.displayName,
            image:user?.photoURL,
            email:user?.email,
        }
      try{
        const image_url=await imageUpload(image)
        const bookData={
            name,
            title,
            image:image_url,
            price,
            description,
            author,
            booked:false
        }
        const data=await axios.post(`${import.meta.env.VITE_API_URL}/book`,bookData)
       toast.success('Books add succesfully')
        e.target.reset()
        navigate('/')
      }catch(err){
        toast.error(err);
      }
    }
    return (
        <div className="mt-8">
            
            <Link className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" to='added-books'>My added book</Link>
            <AddbookForm handleSubmit={handleSubmit}></AddbookForm>
        </div>
    );
};

export default AddBooks;