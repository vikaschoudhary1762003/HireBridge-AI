import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
    //USE STATES
    const [fields , setFields] = useState({email:'' ,password:'' , confirm_password :"" ,user_role:''}); // THIS MANAGES REGISTRATIN FORM FIELDS
    const [error , setError] = useState({}); // this will set error if any field empty then show red border of that perticular field


    //NAVIGATION FUNCTION
    const navigate = useNavigate();

    /* LOGINFORM INPUT HANDLER */
    const handleInput=(e)=>{
        setFields({...fields , [e.target.name]:e.target.value});
    }

    //FUNCTION TO REGISTER USER
    const Register=async(e)=>{
        e.preventDefault();
 
        //CHECK IF ANY FIELD IS EMPTY IF ITS EMPTY SHOW RED COLOR BORDER OF THAT FIELD AND IF FIELD EMPTY THEN DO NOTHING
         const newError = {};  // error object
         
         if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
            newError.email = true; 
        }
    
         if (!fields.password) {
            newError.password = true;
         }
         if (!fields.confirm_password) {
            newError.confirm_password = true;
         }
         if (!fields.user_role) {
            newError.user_role = true;  
         }

         //STORE ERRORS
         setError(newError);

         //IF ANY ERROR EXISTS , STOP
         if(Object.keys(newError) .length >0){
            return ;
         }

        //CONFIRM PASSWORD
        if (fields.confirm_password !== fields.password) {
            alert("Pleas Enter Correct Password");
            return;
        }

        console.log("DATA BEING SENT TO BACKEND:", fields);

        //IF ALL FIELDS FILLED THEN MOVE DATA TO DATABASE
        try {
            const response = await fetch("http://localhost:8080/api/user/register", {
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(fields)
            }) 


            // Get response data
            const data = await response.json();
            console.log("registerd data :" , data);
            console.log("status:", response.status);

            //Check whether data stored successfully or not
            if (response.ok && data.success === true) {
                alert(data.message);  // alert success message

                // make all fields empty when registered successfully
                setFields({email:'', password:'' , confirm_password :"" ,user_role:''});
                navigate("/login");
                return;
            }else if(data.success === false){
                alert(data.message);
                
                return;
            }
            
        } catch (error) {
            console.log("error ", error);
        }
    }

    return(<>
    <div className="register_container">

        <div className="img_container">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/057/659/617/small_2x/cartoon-character-in-suit-and-tie-png.png" alt="" />
        </div>
        <div className="form_container">
            <form>

                {/*HEADER*/}
                <div className="header">

                    <div className="heading">
                        <h3>Create Your HireBridge AI Account</h3>
                    </div>

                    <div className="para">
                        <p>Join Thousands of Students , Colleges and Recruiters .</p>
                    </div>
  
                </div>


                {/*FORM FIELDS*/}

                <div className="fields">
                    
                    <label htmlFor="">Email </label>
                    <input type="email" name="email"  value={fields.email} onChange={handleInput} style={{border:error.email ? "2px solid red" : "2px solid black"}}/>

                    <label htmlFor="">Password</label>
                    <input type="password" name="password" value={fields.password}  onChange={handleInput} style={{border:error.password ? "2px solid red" : "2px solid black"}} />

                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name="confirm_password" value={fields.confirm_password} onChange={handleInput} style={{border:error.confirm_password ? "2px solid red" : "2px solid black"}}/>

                    <label htmlFor="">Select Role</label>
                    <div className="role_container" style={{width:'100%', display:'flex',}}>
                        <label>
                            <input type="radio" name="user_role" value="Student" checked={fields.user_role === "Student"} onChange={handleInput}  /> Student 
                        </label>

                        <label>
                            <input type="radio" name="user_role" value="Recruiter" checked={fields.user_role === "Recruiter"} onChange={handleInput}/>  Recruiter 
                        </label>
                        
                        <label> 
                            <input type="radio"  name="user_role" value="College" checked={fields.user_role === "College"} onChange={handleInput}/>  College 
                        </label>
                        
                    </div>

                    <button type="button" onClick={Register}>Create Account</button>
                    <p>Already have an account ? <a href="#"  onClick={()=>navigate("/login")}>Login</a></p>

                </div>

            </form>
        </div>
    </div>
    </>)
}

export default Register;