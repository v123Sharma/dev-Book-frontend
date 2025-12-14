import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constant'

const Premium = () => {

     const handlePayment =async()=>{
      try{
         const order = await axios.post(BASE_URL+"/payment/create", 
          {membershipType: type},
           {withCredentials:true});
      }catch(err){
         console.error(err)
      }
     }


  return (
 <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6 my-10">

  {/* Silver */}
  <div className="card bg-gradient-to-br from-[#f4f4f5] to-[#d4d4d8]
                  rounded-xl h-44 w-full sm:w-1/2 md:w-1/3 flex flex-col items-center justify-center shadow gap-3 p-4">

    <h1 className="font-semibold text-gray-800">Silver Membership</h1>

    {/* Feature */}
    <div className="flex items-center gap-2 text-gray-700">
      <span className="text-blue-500">✔</span> 3 Months
    </div>

    <button aria-label="Buy Silver Membership" 
            className="mt-3 px-5 py-2 rounded-full bg-gray-700 text-white font-medium shadow 
                       hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all"
                       onClick={()=>handlePayment("silver")}>
      Buy Silver
    </button>
  </div>

  <div className="flex items-center font-semibold text-gray-500">OR</div>

  {/* Gold */}
  <div className="card bg-gradient-to-br from-[#FFD700] to-[#E5A100]
                  rounded-xl h-44 w-full sm:w-1/2 md:w-1/3 flex flex-col items-center justify-center shadow gap-3 p-4">

    <h1 className="font-semibold text-white">Gold Membership</h1>

    {/* Feature */}
    <div className="flex items-center gap-2 text-white">
      <span className="text-blue-500">✔</span> 6 Months
    </div>

    <button aria-label="Buy Gold Membership"
            className="mt-3 px-5 py-2 rounded-full bg-[#B8860B] text-white font-medium shadow 
                       hover:bg-[#996c0a] hover:scale-105 hover:shadow-lg transition-all"
                       onClick={()=>handlePayment("gold")}>
      Buy Gold
    </button>
  </div>
</div>



    
  )
}

export default Premium
