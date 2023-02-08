import React from "react";
import "bootstrap/dist/css/bootstrap.css";
//Routes of our Application
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
//Components for routing
import RoutenList from "./components/routenList";
import Edit from "./components/edit";
import AddRoute from "./components/addRoute";

import DataPointList from "./components/DataPoints/datapointList";
import EditPoint from "./components/DataPoints/editPoint";
import AddPoint from "./components/DataPoints/addDataPoint";

import Dashboard from "./components/public/Dashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { AuthProvider } from "./components/Auth/AuthStatus/User";

import "./App.css";
import "./index.css";

const App = () => (
  <div>
    <Navbar />
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route exact path="/routes" element={<RoutenList />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/editPoint" element={<EditPoint />} />
        <Route path="/addRoute" element={<AddRoute />} />
        <Route path="/datapoints" element={<DataPointList />} />
        <Route path="/addPoint" element={<AddPoint />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
    <Footer></Footer>
  </div>
);

export default App;
