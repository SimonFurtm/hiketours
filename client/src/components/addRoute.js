import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

export default function AddRoute() {
  const [form, setForm] = useState({
    file: null
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
        features: data.features
      };

      // Send the data to the server
      axios.post("http://localhost:7000/api/add", newRoute)
        .catch(error => {
          window.alert(error);
          return;
        });

      setForm({ file: null });
      navigate("/");
    };
    // Read the file
    reader.readAsText(form.file);
  }

  return (
    <div>
      <h3>Add New Route</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="file">File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={(e) => updateForm("file", e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Route"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
