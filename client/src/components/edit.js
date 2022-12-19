import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Update() {
  const [form, setForm] = useState({
    type: "",
    name: "",
    crs: "",
    features: "",
});
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const name = params.name.toString();
     const response = await fetch(`http://localhost:7000/api/update/${params.name.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const route = await response.json();
     if (!route) {
       window.alert(`Route with id ${name} not found`);
       navigate("/");
       return;
     }
 
     setForm(route);
   }
 
   fetchData();
 
   return;
 }, [params.name, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedRoute = {
     type: form.type,
     name: form.name,
     crs: form.crs,
     features: form.features,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:7000/update/${params.name}`, {
     method: "POST",
     body: JSON.stringify(editedRoute),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Route</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Type: </label>
         <input
           type="text"
           className="form-control"
           id="type"
           value={form.type}
           onChange={(e) => updateForm({ type: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.position}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Crs: </label>
         <input
           type="text"
           className="form-control"
           id="crs"
           value={form.crs}
           onChange={(e) => updateForm({ crs: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Features: </label>
         <input
           type="text"
           className="form-control"
           id="features"
           value={form.features}
           onChange={(e) => updateForm({ features: e.target.value })}
         />
       </div>

       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Route"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}