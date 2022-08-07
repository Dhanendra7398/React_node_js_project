import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const Main = () => {
    const [getdata,setuserdata] = useState([]);
   
    //fetch emp data from backend database
    const userdata = async ()=>{
      const res = await fetch('http://localhost:8000/getmydata',{
             
        method : "GET",
        headers : {
         "Contenet-Type":'application/json'
        },
  
  
   });
   const data = await res.json();
  //  console.log(data);
   setuserdata(data);
   
    }
  
    useEffect(()=>{
      userdata();
     
  
    },[])
    // console.log(getdata);
     
  
   
    
    const [empData,setEmpData] = useState({
      name:"",
      age:"",
      contact:"",
      address:"",
    });
    const [userProfile,setUserProfile] = useState("");
  
  
    const handlechange = (e)=>{
      //  console.log(e.target.value);
      setEmpData({
        ...empData,
        [e.target.name] : e.target.value
      });
     
    }

    const handlefile = async (e)=>{
      
      setUserProfile(e.target.files[0]);
      

    }

   
  
    const handlesubmit = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('name', empData.name);
      formdata.append('age', empData.age);
      formdata.append('address', empData.address);
      formdata.append('contact', empData.contact);
      formdata.append('myfile', userProfile);
      var url = "http://localhost:8000/register";
      try {
        
        let res = await axios.post(url, formdata)
        
        if (res.status === 404) {
          alert("somthing wrong");
        } else {
         
       alert("data added");
         window.location.reload();

        }
  
      } catch (error) { 
        alert("catch error");
        console.log(error);
      }
    }
  
  
    const deleteuser = async (e) => {
      
      // console.log(e);
  
      const res = await fetch(`http://localhost:8000/delete/${e}`,{
            
        method : "DELETE",
        headers : {
         "Content-Type" : "application/json"
        }
  
        
      });
      const data = await res.json();
      // console.log(data);
      window.location.reload();
  
  
  
    }
  
  
  
      return (
          
       
  
      <div>
         
        
  
        <nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid">
      {/* heade name */}
      <a className="navbar-brand text-white fw-bold" href="#">CURD API</a> 
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
    </div>
  </nav>
     
     {/* table makeing */}
     <div className='container mt-5'>
      
     {/* <!-- Button trigger modal --> */}
  <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Add Emplooye
  </button>
  
  {/* <!-- Modal --> */}
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          
          {/* Form makeing */}
  
          <form>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input type="text" onChange={handlechange} value={empData.name} name="name" className="form-control" aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
      <label className="form-label">Age</label>
      <input type="text" onChange={handlechange} value={empData.age} name="age" className="form-control" aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
      <label className="form-label">Address</label>
      <input type="text" onChange={handlechange} value={empData.address} name="address" className="form-control" aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
      <label className="form-label">Contact No.</label>
      <input type="text" onChange={handlechange} value={empData.contact} name="contact" className="form-control" aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
    <label className="form-label">Upload Photo</label>
    <input onChange={handlefile} className="form-control" name="myfile" type="file" />
  </div>
    
  </form>
  
  
  
  
  
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" onClick={handlesubmit} className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
  
  
  
  
  
  
  
  
  
  
  
  
     <table className="table">
    <thead>
      <tr className='bg-dark text-white'>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Photo</th>
        <th scope="col">Address</th>
        <th scope="col">Contact No.</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
  
  
  
  
     
    {
      getdata.map((user,index)=>{
        return(
         
          <tr className='text-dark fw-bold' key={index}>
        <th scope="row">{index}</th>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>
          <img style={{"objectFit":"contain"}} className="rounded img-fluid mx-auto d-block" width="100px" src={`/image/${user.profile}`} alt="...."></img>
        </td>
        <td>{user.address}</td>
        <td>{user.contact}</td>
        <td>
          <span><button className='btn btn-sm btn-danger' onClick={()=>deleteuser(user._id)}>Delete</button></span>
          <Link to={`/edit/${user._id}`}><span><button className='btn btn-sm ms-3 btn-warning'>Edit</button></span></Link>
          
         
        </td>
      </tr>
        
        )
      })
    }
    </tbody>
  </table>
  
     </div>
    
  
      </div>
    )
}

export default Main;