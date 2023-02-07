import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const API_URL = "https://zk2ezn.deta.dev/api";

export default function AddDataPoint() {
  const [form, setForm] = useState({
    type: "",
    title: "",
    coordinate: {
      latitude: "",
      longitude: "",
    },
    details: [{ name: "", info: "" }],
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
      type: form.type,
      title: form.title,
      coordinate:{
        latitude: form.latitude,
        longitude: form.longitude,
      },
      details: [...form.details],
    };

    axios.post(API_URL + "/add/datapoint", newDataPoint).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      type: "",
      title: "",
      latitude: "",
      longitude: "",
      details: [{ name: "", info: "" }],
    });
    navigate("/datapoints");
  }

  return (
    <div>
      <h3 className="Center-heading">Add New Data Point</h3>

      <form onSubmit={onSubmit}>

        <div className="form-group">

          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            value={form.type}
            onChange={(e) => updateForm("type", e.target.value)}
          />

          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm("title", e.target.value)}
          />

          <label htmlFor="latitude ">latitude </label>
          <input
            type="number"
            className="form-control"
            id="latitude "
            value={form.latitude}
            onChange={(e) => updateForm("latitude", e.target.value)}
          />
          <label htmlFor="longitude">longitude</label>
          <input
            type="number"
            className="form-control"
            id="longitude"
            value={form.longitude}
            onChange={(e) => updateForm("longitude", e.target.value)}
          />
          <label htmlFor="details">Details</label>
          {form.details.map((detail, index) => (
            <div key={index}>
              <label htmlFor={`name-${index}`}>Name</label>
              <input
                type="text"
                className="form-control"
                id={`name-${index}`}
                value={detail.name}
                onChange={(e) =>
                  updateForm(
                    "details",
                    form.details.map((d, i) =>
                      i === index ? { ...d, name: e.target.value } : d
                    )
                  )
                }
              />
              <label htmlFor={`info-${index}`}>Info</label>
              <input
                type="text"
                className="form-control"
                id={`info-${index}`}
                value={detail.info}
                onChange={(e) =>
                  updateForm(
                    "details",
                    form.details.map((d, i) =>
                      i === index ? { ...d, info: e.target.value } : d
                    )
                  )
                }
              />
            </div>
          ))}
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
