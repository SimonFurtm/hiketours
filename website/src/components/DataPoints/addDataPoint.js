import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

const API_URL = 'https://zk2ezn.deta.dev/api';


export default function AddDataPoint() {
  const [form, setForm] = useState({
    title: "",
    description: "",
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
    
    const newDataPoint = {
      title: form.title,
      description: form.description,
      geolocation: form.geolocation
    };
    
    axios.post(API_URL + "/add/datapoint", newDataPoint)
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({ title: "", description: "", geolocation: "" });
    navigate("/datapoints");
  }

  return (
    <div>
      <h3 className="Center-heading">Add New Data Point</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm("title", e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm("description", e.target.value)}
          />
          <label htmlFor="geolocation">Geolocation</label>
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
            value="Add Data Point"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
