import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://zk2ezn.deta.dev/api";

const Routen = (props) => (
 <tr>
   <td>{props.name}</td>
   <td>{props.info}</td>
   <td>{props.color}</td>
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
 
 // This method fetches the routes from the cache first and then from the server.
 useEffect(() => {
   async function getRouten() {
    //Use cache for better performance and not to many request to the api and database
     console.log("Fetching routes from cache...");
     let data = localStorage.getItem("routen");
     if (data) {
       console.log("Fetched routes from cache:", JSON.parse(data));
       setRoute(JSON.parse(data));
       return;
     }
 
     console.log("Fetching routes from server..." + API_URL);
     const response = await fetch(API_URL + "/allroutes");
  
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

      data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        console.log("Fetched routes:", data);
        localStorage.setItem("routen", JSON.stringify(data));
        setRoute(data);
      } else {
      console.error("Received non-array data from server:", data);
      }
   }
 
   getRouten();
 
   return;
 }, []);
 
 // This method will delete a route add api between 7000/api/delete
 async function deleteRoute(name) {
   await fetch(`${API_URL}/delete/${name}`, {
     method: "DELETE"
   });
 
   const newRoute = routen.filter((el) => el.name !== name);
   localStorage.setItem("routen", JSON.stringify(newRoute));
   setRoute(newRoute);
 }
 
 // This method will map out the routes on the table
 function routenList() {
   return routen.map((route) => {
     return (
       <Routen
         name={route.name}
         info={route.info}
         color={route.color}
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
           <th>Farbe</th>
         </tr>
       </thead>
       <tbody>{routenList()}</tbody>
     </table>
   </div>
 );
}