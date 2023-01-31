import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

const API_URL = 'https://zk2ezn.deta.dev/api';


export default function AddRoute() {
  const [form, setForm] = useState({
    file: null,
    info: ""
  });
  const navigate = useNavigate();

  function updateForm(key, value) {
    setForm((prev) => {
      return { ...prev, [key]: value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Create a FileReader object
    const reader = new FileReader();

    // Set the onload event handler
    reader.onload = () => {
      // Parse the data into a JavaScript object
      const data = JSON.parse(reader.result);

      // Extract the values from the data object
      const newRoute = {
        type: data.type,
        name: data.name,
        crs: data.crs,
        features: data.features,
        info: form.info
      };

      // Send the data to the server
      axios.post(API_URL+"/add/route", newRoute)
        .catch(error => {
          window.alert(error);
          return;
        });

      setForm({ file: null,info: "" });
      navigate("/");
    };
    // Read the file
    reader.readAsText(form.file);
  }

  return (
    <div>
      <h3 className="centered-heading">Add New Route</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="file">File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={(e) => updateForm("file", e.target.files[0])}
          />
          <input
            type="text"
            className="form-control"
            id="info"
            value={form.info}
            onChange={(e) => updateForm("info", e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Add Route"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
