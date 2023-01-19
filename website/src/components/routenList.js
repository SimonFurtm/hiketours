import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Routen = (props) => (
 <tr>
   <td>{props.name}</td>
   <td>{props.info}</td>
   <td>
     <Link className="btn btn-link" to={`/edit`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRoute(props.name);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RoutenList() {
 const [routen, setRoute] = useState([]);
 
 // This method fetches the routes from the database.
 useEffect(() => {
   async function getRouten() {
     console.log("Fetching routes from server...");
     const response = await fetch(`https://hiketours.software:7000/api/allroutes`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

      const data = await response.json();
      if (Array.isArray(data)) {
        console.log("Fetched routes:", data);
        setRoute(data);
      } else {
      console.error("Received non-array data from server:", data);
      }
   }
 
   getRouten();
 
   return;
 }, [routen]);
 
 // This method will delete a route add api between 7000/api/delete
 async function deleteRoute(name) {
   await fetch(`https://hiketours.software:7000/api/delete/${name}`, {
     method: "DELETE"
   });
 
   const newRoute = routen.filter((el) => el.name !== name);
   setRoute(newRoute);
 }
 
 // This method will map out the routes on the table
 function routenList() {
   return routen.map((route) => {
     return (
       <Routen
         name={route.name}
         info={route.info}
         deleteRoute={()=>deleteRoute(route.name)}
         key={route._id}
       />
     );
   });
 }
 
 // This following section will display the table with the routes.
 return (
   <div>
     <h3>Routen List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Information</th>
         </tr>
       </thead>
       <tbody>{routenList()}</tbody>
     </table>
   </div>
 );
}