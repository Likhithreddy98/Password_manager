import React from 'react'

const Display = ({passwordform}) => {
  return (
    <div>
       {
          (passwordform.length == 0 ) ? (<div>no data is available</div>) : (
            passwordform.map((item,i) => (
                  <div  key = {i} className='w-full flex flex-col gap-2 mt-4'>
                   <div className='w-full flex justify-around item-center p-4 border border-black '>
                     <span>{item.username}</span>
                     <span>{item.password}</span>
                     <span>{item.url}</span>
                     <div className=' flex gap-4'>
                       <button className='cursor-pointer font-bold text-xl'>edit</button>
                       <button className='cursor-pointer font-bold text-xl'>delete</button>
                     </div>
                   </div>
                 </div>
            )
            )
          )
         }
    </div>
  )
}

export default Display
