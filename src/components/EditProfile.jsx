import React, { use, useState } from 'react'
import UserCards from './userCards';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {
     const [firstName, setFirstName] = useState(user.firstName);
     const [lastName, setLastName] = useState(user.lastName);
     const [age, setAge] = useState(user.age);
     const [gender, setGender] = useState(user.gender);
     const [about, setAbout] = useState(user.about);
     const [skills, setSkills] = useState(user.skills);
     const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
     const [error, setError] = useState("");
     const dispatch = useDispatch();
     const [showToast, setShowToast] = useState(false);

     const saveProfile=async()=>{
        setError("")
        try{
          const res = await axios.patch(BASE_URL + "/profile/edit",{
            firstName, 
            lastName,
            gender,
            age,
            photoUrl,
            about},{
                withCredentials:true
            });
            dispatch(addUser(res.data));
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false);
            },5000)
        }catch(err){
            setError(err.response.data);
        }
     }
  return (
    <>
    <div className='flex justify-center my-10'>
    <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
      <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">First Name</legend>
            <input type="text" value={firstName} className="input" placeholder="Enter first Name"
            onChange={(e)=>setFirstName(e.target.value)}
            />
     </fieldset>

     <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Last Name</legend>
            <input type="text" value={lastName} className="input" placeholder="Enter last Name" 
            onChange={(e)=>setLastName(e.target.value)}
            />
     </fieldset>

      <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">age</legend>
            <input type="text" value={age} className="input" placeholder="Enter age" 
            onChange={(e)=>setAge(e.target.value)}
            />
     </fieldset>


      <fieldset className="fieldset my-2 justify-center">
            <legend className="fieldset-legend my-1 justify-center">about</legend>
            <input type="text" value={about} className="input" placeholder="describe yourself" 
            onChange={(e)=>setAbout(e.target.value)}
            />
     </fieldset>

      <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Skills</legend>
            <input type="text" value={skills} className="input" placeholder="Your skills" 
            onChange={(e)=>setSkills(e.target.value)}
            />
     </fieldset>

      <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Gender</legend>
            <input type="text" value={gender} className="input" placeholder="gender" 
            onChange={(e)=>setGender(e.target.value)}
            />
     </fieldset>


     <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Profile Photo</legend>
            <input type="text" value={photoUrl} className="input" placeholder="photo" 
            onChange={(e)=>setPhotoUrl(e.target.value)}
            />
     </fieldset>
</div>
     <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>
    </div>    
    <UserCards user={{firstName , lastName, gender, age, photoUrl, about}}/>    
    </div>
    {showToast && (
        <div className="toast toast-top toast-center">   
    <div className="alert alert-success">
    <span>Profile Updated Successfully..!.</span>
  </div>
  </div>
    )}

    </>
  )
}

export default EditProfile
