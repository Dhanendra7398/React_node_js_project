import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

//Edit Page of Emplooye data

const Edit = () => {

  const {id} = useParams(""); 
  const [userData,setserData] = useState({
    name:'',
    age:'',
    address:'',
    contact:'',
  });
  const getuserdata = async () =>{
    const res = await fetch(`http://localhost:8000/getu/${id}`,{
         
          method : "GET",
          headers : {
            'Content-Type' : 'application/json'
          },

    })
    const data = await res.json();
    setserData({
      name:data.name,
      age:data.age,
      address:data.address,
      contact:data.contact,
    })

  }



  const handlechange = (e)=>{
    setserData({
      ...userData,
      [e.target.name] : e.target.value
    });
   
  }


  const handleupdate = async (e)=>{
      e.preventDefault();
    const {name,age,address,contact} = userData;
    // console.log(userData);
    const res = await fetch(`http://localhost:8000/update/${id}`,{
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        name,age,address,contact
      })
    });

    const data = await res.json();
    // console.log(data);

    if(res.status==404){
      // console.log("error");
      alert("something wrong");
      
    }else{
      alert("data updated");
    }
   

  }
  
 


  useEffect(()=>{
    
    getuserdata();

  },[id])


  return (
      <>
         <nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid">
      {/* heade name */}
      <a className="navbar-brand text-white fw-bold" href="#">Update Profile</a> 
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
    </div>
  </nav>
        <div  className='container mt-5 editpage'>
        <a href="/"> <button className='btn border-0 rounded fw-bold fs-6 btn-sm btn-primary '>Home</button> </a>
        <hr />
       
  {/* <form encType='multipart/form-data'> */}
  <div className="mb-3">
    <label  className="form-label">Name</label>
    <input value={userData.name} onChange={handlechange} name="name" type="text" className="form-control"  aria-describedby="emailHelp" />

  </div>
  <div className="mb-3">
    <label  className="form-label">Age</label>
    <input value={userData.age} onChange={handlechange} name="age" type="text" className="form-control"  aria-describedby="emailHelp" />

  </div>
  <div className="mb-3">
    <label  className="form-label">Address</label>
    <input value={userData.address} onChange={handlechange} name="address" type="text" className="form-control"  aria-describedby="emailHelp" />

  </div>
  <div className="mb-3">
    <label  className="form-label">Contact No</label>
    <input value={userData.contact} onChange={handlechange} name="contact" type="text" className="form-control"  aria-describedby="emailHelp" />

  </div>
   <div className='mt-3 mb-3'>

  <button onClick={handleupdate} type="submit" className="btn btn-primary">Update</button>
      
        </div>
        </div>
       
         </>
  )
}

export default Edit