import PropTypes from 'prop-types';
import useAuth from './hooks/useAuth';
import { useState } from 'react';
import BuyModal from './modal/BuyModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import PrivateRoute from '../routes/PrivateRoute';

const Cards = ({book}) => {
	// console.log(book);
	const {user}=useAuth()
	 const [isOpen, setIsOpen] = useState(false)
	 //modal function
	 function open() {
		setIsOpen(true)
	  }
	
	  function close() {
		setIsOpen(false)
	  }

	  //handle buy submit form
	  const handleSubmit=async(e)=>{
		e.preventDefault()
		const name=e.target.name.value;
		const title=e.target.title.value;
		const price=e.target.price.value;
		const contact=e.target.contact.value;
		const bookingData={
			name,
			title,
			price,
			contact,
			booked:true,
			bookId:book?._id,
			author:book?.author,
			reader:{
				name:user?.displayName,
				email:user?.email
			},
			
		}
		console.table(bookingData)
		try{	
			await axios.post(`${import.meta.env.VITE_API_URL}/booking`,bookingData)
			// console.log(result);
			toast.success('Buy book successfully')
			close()
		}catch(err){
			toast.err(err.message)
		}
	  }

    return (
        <div className="max-w-xs p-6 w-[30%]  h-30 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
	<img className='w-[100%] h-40 mx-auto object-cover' src={book.image} />
	<div className="mt-6 mb-2">
		<span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">{book.title}</span>
		<h2 className="text-xl font-semibold tracking-wide">{book.name}</h2>
	</div>
	<p className="text-xl mb-2">${book.price}</p>
	<p className="dark:text-gray-800">{book.description}</p>
    
	<button  onClick={()=>setIsOpen(true)}  className="rounded bg-violet-500 px-8 py-2 mt-2 border-r-green-800 ">Buy Now</button>
	
	{/* buy modal */}
	<BuyModal handleSubmit={handleSubmit}  bookData={book} setIsOpen={setIsOpen} isOpen={isOpen} open={open} closeModal={close}></BuyModal>
</div>
    );
};

// Cards.propTypes = {
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     description: PropTypes.string
//   };

export default Cards;