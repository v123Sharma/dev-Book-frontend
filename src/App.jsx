import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./NavBar"
import Login from "./Login"
import Body from "./Body"
import Profile from "./Profile"


function App() {
  return (
    <> 
    <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="login" element={<Login/>} />
            <Route path="profile" element={<Profile/>} />
          
          </Route>
       {/*   <Route path="/login" element={<div>Login Page</div>}></Route>
          <Route path="/test" element={<div>Test Page</div>}></Route>
       */}
        </Routes> 
                  
    
    </BrowserRouter>
    
         
    </>
  )
}

export default App
