import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from './../../../components/hooks/useAuth';
import AuthorBookTable from "./AuthorBookTable";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddedBooklist = () => {
    const [book,setBook]=useState([])
    const [isOpen, setIsOpen] = useState(false) 
//    console.log(book.data);
    const {user}=useAuth()

  //get book data from the server
    const getData=async()=>{
        try{
            const data =await axios(`${import.meta.env.VITE_API_URL}/book/${user?.email}`)
            setBook(data)
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        getData()
    },[user?.email])

    //delete a book from the server
    const{mutateAsync}=useMutation({
        mutationFn:async(id)=>{
            const {data}=await axios.delete(`${import.meta.env.VITE_API_URL}/book/${id}`)
            return data
        },
        onSuccess:data=>{
            console.log(data);
            getData()
            toast.success('Successfully deleted')
        }
    })

    //delete book data
    const handleDelete=async(id)=>{
        await mutateAsync(id)
    }

    return (
        <>
        <h1 className=" flex justify-center text-xl">My Added Book List</h1>
        {book.data?.length > 0 ? (
  book.data.map(book => <AuthorBookTable getData={getData}  key={book._id} book={book} handleDelete={handleDelete}></AuthorBookTable>)
) : (
  <p>No books available</p>
)}
    </>
    );
};

export default AddedBooklist;