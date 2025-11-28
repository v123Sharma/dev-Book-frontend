import axios from 'axios';
import { useState } from 'react'

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

   const handleLogin = async()=>{
    try{ 
      const result= await  axios.post("http://localhost:3000/login", {
      emailId, 
      password
    },{withCredentials:true});
  }catch(err){
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
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login Button</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
