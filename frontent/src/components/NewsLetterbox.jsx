import React from 'react'

const NewsLetterbox = () => {

    const onSubmitHandler=(event)=>{
        event.preventDefault();

    }

  return (
    <div className=' text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now And Get 20% Off</p>
      <p className='text-gray-400 mt-3'>
"Stop missing out! Our best-sellers sell out in hours. Follow us now to get an instant alert
 (and a cheeky 20% off code) the moment we restock. 🔔"
      </p>
      <form onClick={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your Email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>

  )
}

export default NewsLetterbox
