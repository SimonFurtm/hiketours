import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RoutenList from "./components/routenList";
import Edit from "./components/edit";
import AddRoute from "./components/addRoute";
import Footer from "./components/Footer";

const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RoutenList />} />
       <Route path="/edit" element={<Edit />} />
       <Route path="/addRoute" element={<AddRoute />} />
     </Routes>
     <Footer/>
   </div>
 );
};

export default App;
