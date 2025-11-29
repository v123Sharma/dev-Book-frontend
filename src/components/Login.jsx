import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';


const Login = () => {

  const [emailId, setEmailId] = useState("priya.verma@example.com");
  const [password, setPassword] = useState("Priya@2024#");
  const [error, setError] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleLogin = async()=>{
    
    try{ 
      const res = await  axios.post(BASE_URL + "/login", {
      emailId, 
      password
    },{withCredentials:true})    
    dispatch(addUser(res.data));
   return  navigate("/");
  }catch(err){
    setError(err?.response?.data || "Something Went Wrong......");
    console.error(err);
  }
   }


  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div>
      <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Enter your Email ID</legend>
            <input type="text" value={emailId} className="input" placeholder="Enter email"
            onChange={(e)=>setEmailId(e.target.value)}
            />
     </fieldset>

     <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Enter Your Password</legend>
            <input type="text" value={password} className="input" placeholder="password" 
            onChange={(e)=>setPassword(e.target.value)}
            />
     </fieldset>
</div>
     <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login Button</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
