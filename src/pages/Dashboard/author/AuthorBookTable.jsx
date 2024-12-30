import { useState } from "react";
import UpdateBookData from "../../../components/modal/UpdateBookData";

import axios from "axios";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";


const AuthorBookTable = ({book,handleDelete,getData}) => {
    // console.log(book);
    const [isOpen, setIsOpen] = useState(false)
    const[bookData,setBookData]=useState(book)
    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }
          //   handle Image update
  const handleImage = async image => {
    
    try {
      // upload image
      const image_url = await imageUpload(image)
      console.log(image_url)
      setBookData({ ...bookData, image: image_url })
      // setLoading(false)
    } catch (err) {
      console.log(err)
      // setLoading(false)
      toast.error(err.message)
    }
  }

    //handleSubmit modal
    const handleSubmit=async(e)=>{
      e.preventDefault()
        const name=e.target.name.value;
        const title=e.target.title.value;
        const price=e.target.price.value;
        // const image=e.target.image.value;
      
        console.log({name:name,title:title,price:price});
        // const image_url = await imageUpload(image)
        setBookData({name:name,title:title,price:price});
        const updatedBookData = Object.assign({}, bookData)
        delete updatedBookData._id
        try{
            const data=await axios.put(`${import.meta.env.VITE_API_URL}/book/update/${book?._id}`,updatedBookData)
            console.log(data);
            toast.success('Book updated successfully')
            getData()
            close()
        }catch(err){
          console.log(err);
        }
    }

    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setBookData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    return (
        <>
        
        <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='block relative'>
                <img
                  alt='profile'
                  src={book?.image}
                  className='mx-auto object-cover rounded h-10 w-15 '
                />
              </div>
            </div>
            <div className='ml-3'>
              <p className='text-gray-900 whitespace-no-wrap'>{book?.name}</p>
            </div>
            <div className='ml-3'>
              <p className='text-gray-900 whitespace-no-wrap'>{book?.title}</p>
            </div>
          </div>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{book?.location}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>${book?.price}</p>
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
          <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <button onClick={()=>handleDelete(book?._id)} className='relative'>Delete</button>
          </span>
          {/* Delete modal */}
        </td>

        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button onClick={()=>open(true)}  className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Update</span>
          </button>
          {/* Update Modal */}
         <UpdateBookData bookData={bookData} handleImage={handleImage}  setBookData={setBookData} book={book} handleSubmit={handleSubmit} setIsOpen={setIsOpen} isOpen={isOpen} open={open} closeModal={close}></UpdateBookData>
        </td>
      </tr>
      </>
    );
};

export default AuthorBookTable;