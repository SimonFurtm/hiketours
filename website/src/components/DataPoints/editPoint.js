import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const API_URL = "https://zk2ezn.deta.dev/api";

export default function UpdateRoute() {
  const [form, setForm] = useState({
    type: "",
    title: "",
    latitude: "",
    longitude: "",
    details: [
      {
        name: "",
        info: "",
      },
    ],
  });
  const navigate = useNavigate();

  function updateForm(key, value) {
    setForm((prev) => {
      return { ...prev, [key]: value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Send a request to update the DataPoint
    axios.patch(API_URL + `/updateDP/${form.title}`, {
        type: form.type,
        latitude:form.latitude, 
        longitude:form.longitude,
        details: form.details,
      })
      .catch((error) => {
        window.alert(error);
        return;
      });

    setForm({
      title: "",
      type: "",
      coordinate: { latitude: "", longitude: "" },
      details: [{ name: "", info: "" }],
    });
    navigate("/");
  }

  return (
    <div>
      <h3 className="Center-heading">Update DataPoint</h3>
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
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            value={form.type}
            onChange={(e) => updateForm("type", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            className="form-control"
            id="latitude"
            value={form.latitude}
            onChange={(e) =>
              updateForm("latitude", e.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            className="form-control"
            id="longitude"
            value={form.longitude}
            onChange={(e) => updateForm("longitude", e.target.value)}
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
