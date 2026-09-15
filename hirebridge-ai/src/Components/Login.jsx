import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    //NAVIGATION PAGE
    const navigate = useNavigate();

    const [fields , setFields] = useState({email:"" , password:""});
    const [error , setError] = useState({});



    //HANDLE LOGIN INPUTS
    const handleLogin=(e)=>{
        setFields({...fields , [e.target.name] : e.target.value})
    }


    //LOGIN FUNCTION
    const Login=async(e)=>{
        e.preventDefault();

        const newError = {};

        //STOP CODE IF ERROR ACCURE
        if (Object.keys(newError).length > 0) {
            return;
        }

        //VALIDATION
        if (!fields.email) {
            newError.email = true;
        }

        if (!fields.password) {
            newError.password = true;
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/login",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(fields)
            })


            //GET JSON RESPONSE DATA and CONVERT TO JAVASCRIPT OBJECT
            const data = await response.json();
            console.log("Response data :" , data);

            // IF LOGIN SUCCESS RETURN MESSAGE
            if (data.success === true && data.user_role === "Student") {
                //SAVE USER ID IN LOCAL STORAGE
                localStorage.setItem("user_id" , data.user_id);
                //SAVE USER ROLE IN LOCAL STORAGE
                localStorage.setItem("user_role" , data.user_role);

                console.log("local user id :" , data.user_id );
                console.log("local user role ", data.user_role);
                alert(data.message);
                setFields({email:"" , password:""});
                navigate("/studentdashboard");
                return;


            }else if (data.success === true && data.user_role === "College") {
                alert(data.message);
                setFields({email:"" , password:""})
                alert("navigate to college dashboard");
                return;


            }else if (data.success === true && data.user_role === "Recruiter") {
                alert(data.message);
                localStorage.setItem("user_id", data.user_id);
                 localStorage.setItem("user_role", data.user_role);
                setFields({email:"" , password:""})
                navigate("/recruiterdashboard");
                return;


            }else if (data.success === true && data.user_role === "Company") {
                alert(data.message);
                setFields({email:"" , password:""})
                alert("navigate to company dashboard");
                return;


            }else if (data.success === false) { //LOGIN FAILED
                alert(data.message);
                return;
            }



        } catch (error) {
            console.log("login error" , error);
        }

    }


    return(<>

    <div className="login_container">

        <div className="img_container">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/057/659/617/small_2x/cartoon-character-in-suit-and-tie-png.png" alt="" />
        </div>
        <div className="form_container">
            <form>

                {/*HEADER*/}
                <div className="header">

                    <div className="heading">
                        <h3>Welcome Back</h3>
                    </div>

                    <div className="para">
                        <p>Sign in to continue to HireBridge AI.</p>
                    </div>
  
                </div>


                {/*FORM FIELDS*/}

                <div className="fields">
                    
                    <label htmlFor="">Email </label>
                    <input type="email" name="email" value={fields.email} onChange={handleLogin} />

                    <label htmlFor="">Password</label>
                    <input type="password" name="password" value={fields.password} onChange={handleLogin} />

                    <a href="#">Forget Password</a>
                    
                    <button type="button" onClick={Login}>Login</button>
                    <p>Don't have an account ? <a href="#" onClick={()=>navigate("/register")}>Register</a></p>

                </div>

            </form>
        </div>
    </div>

    </>)
}
export default Login;