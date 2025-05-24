import react from 'react';
import Display from './components/Display'
import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";


import './App.css'

function App() {
  const [form, setform] = useState({ username: '', password: '', url: '' });
  const [passwordform,setpasswordform] = useState([]);
  const handlechange = (e) => {
     const {name,value} = e.target;
    setform((prev) => ({...prev,[name] : value,}))
  }
  const handlesubmit = async() => {
    if(form.password.length <= 3 || form.url.length <= 3 || form.username.length <= 3) {
      console.log("not recommended");
      return ;
    }
      const newId = uuidv4();

 
  setpasswordform((prev) => [...prev, { id: newId, ...form }]);

  try {
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ ...form, id: newId }),
    });

    console.log("Status:", response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Server Response:", data.message);


    setform({ username: "", password: "", url: "" });
  } catch (err) {
    console.error("Error during form submission:", err);
  }
console.log('Form Submitted:', form);
setform({ username: '', password: '', url: '' });
  }  

 const handledelete = async (id) => {
  try {

    const newpass = passwordform.filter((item) => item.id !== id);
    setpasswordform(newpass);

    const res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), 
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const result = await res.json();
    console.log("Delete response:", result.message);
  } catch (err) {
    console.error("Error during delete:", err);
  }
};

  const Getdata = async () => {
  try {
    const response = await fetch("http://localhost:3000/");
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json(); 
    console.log("Passwords data:", data);

    setpasswordform(data); 
  } catch (error) {
    console.error("Error fetching passwords:", error);
  }
};

  useEffect(() => {
    Getdata();
  },[]);
  return (
    <>
      <div className="container  mx-auto">
        <div className="bg-green-400 w-full h-24 mt-10">
          <h2 className='text-center p-8 font-bold text-2xl'>Passowod manager</h2>
        </div>
        <div className="all_fields w-full flex justify-center items-center mt-10 flex-col gap-8">
          <div className='flex flex-col justify-start item-center w-[80%] gap-2'>
            <input name="username" value={form.username} onChange={handlechange} type="text" placeholder='Enter the user name' className='border-[2px] border-black outline-black p-2 text-black' />
            <input name="password" value={form.password} onChange={handlechange} type="password" placeholder='Enter the password' className='border-[2px] border-black p-2' />
            <div>
              <input name="url" value={form.url} onChange={handlechange} type="text" placeholder='Enter the url' className='border-[2px] border-black  w-full p-2' />
            </div>
          </div>
          <button onClick={handlesubmit} className='w-[80%] p-4 rounded-full bg-green-500 cursor-pointer'>Add</button>
        </div>
       <div>
       {
          (passwordform.length == 0 ) ? (<div>no data is available</div>) : (
            passwordform.map((item,i) => (
                  <div  key = {i} className='w-full flex flex-col gap-2 mt-4'>
                   <div className='w-full flex justify-around item-center p-4 border border-black '>
                     <span>{item.username}</span>
                     <span>{item.password}</span>
                     <span>{item.url}</span>
                     <div className=' flex gap-4'>
                       <button  onClick={() => {handleedit(item.id)}} className='cursor-pointer font-bold text-xl'>edit</button>
                       <button onClick={() => {handledelete(item.id)}} className='cursor-pointer font-bold text-xl'>delete</button>
                     </div>
                   </div>
                 </div>
            )
            )
          )
         }
    </div>
      </div>
    </>
  )
}

export default App
