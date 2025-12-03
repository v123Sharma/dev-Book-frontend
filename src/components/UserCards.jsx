import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCards = ({user}) => {
  const {_id,firstName, lastName, photoUrl, gender, age, about} = user;

  const dispatch = useDispatch();

  const handleSendRequest =async(status, userId)=>{
    try{
      const res = await axios.post(
        BASE_URL + "/ConnectionRequest/send/" + status + "/" + userId,
        {},
        {withCredentials:true}            
      );
      dispatch(removeUserFromFeed(userId));
    }catch(err){
          console.error(err)
    }
  }
    
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h1 className="card-title flex justify-center">{firstName + " " + lastName}</h1>
    {age && gender && <h2>{age +", "+ gender}</h2>}
    <h3>{about}</h3>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" 
      onClick={()=>  handleSendRequest("ignored", _id)}>
      Ignore
      </button>
      <button className="btn btn-secondary"
      onClick={()=>  handleSendRequest("interested", _id)}>
      Inetersted
      </button>
    </div>
    
  </div>
</div>
  )
}

export default UserCards;
