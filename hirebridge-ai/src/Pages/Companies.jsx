import { useEffect, useState } from "react";

function Companies() {

    // STATE CONTAINER FOR CONTAINING ALL COMPANIES
    const [companyContainer , setCompanyCantainer] = useState([]); // this will containe or store all the registered companies of this plateform.
    const [loading,setLoading] = useState(false);



    //FUNCTION TO FETCH ALL COMPANIES TO DISPLAY TO STUDENTS COLLEGE AND RECRUITER ITSELF.
    const fetchCompanies=async()=>{
        try {
            setLoading(true);

            //API TO FETCH ALL COMPANIES DATA FROM DATABASE
            const resp = await fetch("http://localhost:8080/api/recruiter_profile/getAllData");

            //check all registered companies 
            console.log("COMPANIES STATUS" , resp.status);
            if (!resp.ok) {
                console.error("FAILED TO FETCH COMPANIES", resp.status);
                
            }

            const data = await resp.json();
            console.log("REG COMPANIES RESPONSE" , data);
            
            if (!data || data.length === 0) {
                alert("No company registered");
                return;
            }

            //STORE ALL COMPANIES IN THIS CONTAINER
            setCompanyCantainer(data);
            
        } catch (error) {
            console.log("Failing to fetch data", error);
        }finally{
            setLoading(false);
        }
    }

    useEffect( ()=>{
        fetchCompanies();
    },[])

    return(<>
    
    <div className="company_page_container">
        <header>
            <div>
                <h1>Top Companies Hiring</h1>
            </div>

            <div>
                <h3>Join leading companies and build your dream career</h3>
            </div>
        </header>

        {/*SEARCHING CONTAINER*/}
        <div className="searching_container">
            <input type="search" name="" placeholder="Search Companies...." />
        </div>

        {/*DISPLAY REGISTERED COMPANIES HERE*/}
        <div className="registered_company_container">

            {/*DISPLAY THE REGISTERED COMPANIES HERE */}
            {loading ?(
                <p>Loading Companies...</p>
            ):companyContainer.length === 0 ?(
                <p>No Company</p>
            ):(
                companyContainer.map( (comp) => (
                    <div className="comp_card" key={comp.recruiter_profile_id}>
                        <div className="header">
                            <img src={comp.comp_logo} alt="" />
                        </div>
                        <h4>{comp.company_name}</h4>
                        <h4>{comp.industry}</h4>
                        <h4>{comp.location} , {comp.country}</h4>
                        <a href={comp.website} target="_blank"> Visit Website</a>

                    </div>
                ))
            )}
        </div>
    </div>
    </>)
}
export default Companies;