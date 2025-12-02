import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests = useSelector((store)=>store.requests)
    const usedispatch = useDispatch();

    const fetchMyRequests =async()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/requests/pending",{withCredentials:true});
            console.log(res?.data?.data);
            usedispatch(addRequest(res?.data?.data))

        }catch(err){
            console.error(err)
        }
    }

 useEffect(()=>{
    fetchMyRequests();
 },[]);   



  if(!requests) return;

  if(requests.length==0) return <h1>No Request Found..!</h1>;
  
  
  return (
    <div className='text-center my-10'>
     <h1 className="text-bold-black text-3xl">Requests</h1>

    {requests.map((requests)=>{
        const {_id,firstName,lastName, photoUrl , gender ,age , about} = requests.fromUserId;
    
    return (
        <div key={_id} className="flex m-4 p-4 justify-between item-center  bg-base-200 w-1/3 mx-auto">
            <div ><img alt="photo"  className="w-20 h-20 rounded-full"  src={photoUrl}></img></div>
            <div className="text-left mx-4">
                 <h2 className='text-bold text-xl'>
                    {firstName + " " + lastName}
                 </h2>
           {age && gender &&  <p>{age + " " + gender}</p> }   
            <p>{about}</p>
            <div>
                <button className="btn btn-primary mx-5">Reject</button>
                <button className="btn btn-secondary">Accept</button>
            </div>
            </div>
        </div>
    )})}
    </div>
  )
}

export default Requests
