import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

const API_URL = 'http://localhost:7000';

export default function UpdateRoute() {
  const [form, setForm] = useState({
    file: null,
    name: "", // add a field to store the name of the route to update
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

    // Check if a file was selected
    if (form.file) {
      // Create a FileReader object
      const reader = new FileReader();

      // Set the onload event handler
      reader.onload = () => {
        // Parse the data into a JavaScript object
        const data = JSON.parse(reader.result);

        // Extract the values from the data object
        const updatedRoute = {
          type: data.type,
          name: data.name,
          crs: data.crs,
          features: data.features,
          info: form.info
        };

        // Send the data to the server to update the route
        axios.patch(API_URL+`/update/${form.name}`, updatedRoute)
          .catch(error => {
            window.alert(error);
            return;
          });

        setForm({ file: null, name: "", info:"" });
        navigate("/");
      };
      // Read the file
      reader.readAsText(form.file);
    } else {
      // Send a request to update the route without a file
      axios.patch(API_URL+`/update/${form.name}`, { info: form.info })
        .catch(error => {
          window.alert(error);
          return;
        });

      setForm({ file: null, name: "", info:"" });
      navigate("/");
    }
  }

  return (
    <div>
      <h3 className="centered-heading">Update Route</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="file">File (optional)</label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={(e) => updateForm("file", e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Route Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
          />
        </div>
        <div className="form-group">
        <label htmlFor="info">Info</label>
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
            value="Update Route"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}