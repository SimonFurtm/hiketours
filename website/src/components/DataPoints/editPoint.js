import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

const API_URL = 'https://zk2ezn.deta.dev/api';

export default function UpdateRoute() {
  const [form, setForm] = useState({
    title: "",
    description: "", // add a field to store the name of the route to update
    geolocation: ""
  });
  const navigate = useNavigate();

  function updateForm(key, value) {
    setForm((prev) => {
      return { ...prev, [key]: value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

      // Send a request to update the route without a file
      axios.patch(API_URL+`/updateDP/${form.title}`, { describtion: form.description, geolocation: form.geolocation })
        .catch(error => {
          window.alert(error);
          return;
        });

      setForm({ tittle: "", description: "", geolocation:"" });
      navigate("/");
  }
  
  return (
    <div>
      <h3 className="centered-heading">Update Route</h3>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label htmlFor="name">DataPoint Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm("title", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.describtion}
            onChange={(e) => updateForm("description", e.target.value)}
          />
        </div>
        <div className="form-group">
        <label htmlFor="info">Geolocation</label>
        <input
          type="text"
          className="form-control"
          id="geolocation"
          value={form.geolocation}
          onChange={(e) => updateForm("geolocation", e.target.value)}
        />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update DataPoint"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}