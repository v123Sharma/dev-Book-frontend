import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';


const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLogInForm] = useState(false);
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
   const handleSignUp=async()=>{
    try{
     const res = await axios.post(BASE_URL + "/signup",
       {
          firstName,
          lastName,
          emailId,
          password
     },{
      withCredentials:true
     });
     dispatch(addUser(res.data));
     return  navigate("/profile");
    }catch(err){
      setError(err?.response?.data || "Something Went Wrong......");
      console.error(err);
    }
   }


  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "LogIn" : "SignUp"}</h2>
    <div>
      {!isLoginForm &&(
         <><fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">First Name</legend>
            <input type="text" value={firstName} className="input" placeholder="Enter First name"
            onChange={(e)=>setFirstName(e.target.value)}
            />
     </fieldset>

     <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Last Name</legend>
            <input type="text" value={lastName} className="input" placeholder="last name" 
            onChange={(e)=>setLastName(e.target.value)}
            />
     </fieldset> </>
     )}
     <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Enter your Email ID</legend>
            <input type="text" value={emailId} className="input" placeholder="Enter email"
            onChange={(e)=>setEmailId(e.target.value)}
            />
     </fieldset>

     <fieldset className="fieldset my-2">
            <legend className="fieldset-legend my-1">Enter Your Password</legend>
            <input type="password" value={password} className="input" placeholder="password" 
            onChange={(e)=>setPassword(e.target.value)}
            />
     </fieldset>
</div>
     <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={isLoginForm? handleLogin: handleSignUp}>
        {isLoginForm? "Login" : "SignUp"}
        </button>
    </div>
      <p className="text-red-400 m-auto cursor-pointer" 
      onClick={()=>setIsLogInForm((value)=>!value)}>
        {isLoginForm 
      ?"New User? Signup Here"
      :"Existing User LogIn Here"}
      </p>
  </div>
</div>
    </div>
  )
}

export default Login
