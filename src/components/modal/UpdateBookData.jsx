import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const UpdateBookData = ({isOpen,bookData,setIsOpen,closeModal,handleSubmit,setBookData,handleImage}) => {
    return (
  <div className=''>
      <button onClick={() => setIsOpen(true)}></button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Update book</DialogTitle>
            
            <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-10'>
          <div className='space-y-1 text-sm'>
            <label htmlFor='name' className='block text-gray-600'>
              Name
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
              name='name'
              id='name'
              value={bookData?.name}
              onChange={e=>setBookData({...bookData,name:e.target.value})}
              type='text'
              placeholder='name'
              required
            />
          </div>
          <div className='space-y-1 text-sm'>
            <label htmlFor='title' className='block text-gray-600'>
              Title
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
              name='title'
              id='title'
              // value={book?.title}
              value={bookData?.title}
              onChange={e=>setBookData({...bookData,title:e.target.value})}
              type='text'
              placeholder='title'
              required
            />
          </div>
         

          <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
              <div className='flex flex-col w-max mx-auto text-center'>
                <label>
                  <input
                    className='text-sm cursor-pointer w-36 hidden'
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                   onChange={ (e)=>handleImage(e.target.files[0])}
                    hidden
                  />
                  <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                    Upload Image
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className='flex justify-between gap-2'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='price' className='block text-gray-600'>
                Price
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='price'
                id='price'
                // value={book?.price}
                type='number'
                value={bookData?.price}
              onChange={e=>setBookData({...bookData,price:e.target.value})}
                placeholder='price'
                required
              />
            </div> 
          </div>         
        </div>

       <div className='flex gap-5'>
       <button
       
          // type='submit'
          // onClick={() => setIsOpen(false)}
          onClick={() => closeModal()}
          className='w-full p-3 mt-5  text-center font-medium text-white transition duration-200 rounded shadow-md bg-red-500'
        >
          Cancel
        </button>
        <button
          type='submit'
          // onClick={() => closeModal()}
          className='w-full p-3 mt-5  text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          Update
        </button>
       </div>
      </form>
            <div className="flex gap-4">
              {/* <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>update</button> */}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      </div>
    );
};

export default UpdateBookData;