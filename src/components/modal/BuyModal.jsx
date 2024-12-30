import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
const BuyModal = ({isOpen,setIsOpen,closeModal,bookData,handleSubmit}) => {
    return (
       <div className=''>
             <button onClick={() => setIsOpen(true)}></button>
             <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
               <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                 <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                   <DialogTitle className="font-bold">Buy book</DialogTitle>
                   
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
                    
                     type='text'
                     placeholder='title'
                     required
                   />
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
                     
                       placeholder='price'
                       required
                     />
                   </div> 
                 </div>         
                 <div className='flex justify-between gap-2'>
                   <div className='space-y-1 text-sm'>
                     <label htmlFor='contact' className='block text-gray-600'>
                       contact
                     </label>
                     <input
                       className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                       name='contact'
                       id='contact'
                       
                       type='name'
                       placeholder='contact'
                       required
                     />
                   </div> 
                 </div>         
               </div>
       
              <div className='flex gap-5'>
              <button
                 onClick={() => closeModal()}
                 className='w-full p-3 mt-5  text-center font-medium text-white transition duration-200 rounded shadow-md bg-red-500'
               >
                 Cancel
               </button>
               <button
                 type='submit'
                 
                 className='w-full p-3 mt-5  text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
               >
                 Buy
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

export default BuyModal;