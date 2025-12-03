import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constant';
import { addFeed } from '../utils/feedSlice';
import UserCards from  './userCards';

const Feed = () => {
     const feed = useSelector((store)=> store.feed);
 //    console.log(feed)

     const dispatch = useDispatch();

     const getFeed = async ()=>{
          if(feed) return;  // <-- FIXED

        try{
          const res = await axios.get(BASE_URL + "/feed", {withCredentials:true});
         // console.log(res.data);
          dispatch(addFeed(res?.data));
         


        }catch(err){
          console.error(err)
        }
     }
  
useEffect(()=>{
  getFeed();
},[]);    

  if(!feed) return;
  if(feed.length<=0) return <h1 className='flex justify-center my-10'>No New User Found....</h1>

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCards user={feed[0]}/>
    </div>
    )
  );
}

export default Feed
