// import { useState } from "react";

import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "axios";
import LoadingSpinner from "../components/spinner/LoadingSpinner";




const Home = () => {
  const[books,setbooks]=useState([])
  const [loading,setLoading]=useState(true)
  const[error,setError]=useState('')

  useEffect(()=>{
    const getData=async()=>{
     try{
     setLoading(false)
      const{data}=await axios(`${import.meta.env.VITE_API_URL}/books`)
      setbooks(data)
     }
     catch(err){
      setLoading(false)
      setError(err.message);
     }
    }
    getData()
  },[])

  if (loading) return <LoadingSpinner></LoadingSpinner>; 
  if(error)return <p>error</p>
    return (
        <div>  
            
            {/* <Cards></Cards> */}
         <div className="flex  flex-wrap ">
         {
            books.map(book=><Cards book={book} key={book.name}></Cards>)
         }
         </div>
        </div>
    );
};

export default Home;