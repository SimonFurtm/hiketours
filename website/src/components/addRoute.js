import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/addroutes.css";

const API_URL = "https://zk2ezn.deta.dev/api";

export default function AddRoute() {
  const [form, setForm] = useState({
    file: null,
    info: "",
    sportColor:"",
    sportKeywords:"",
    sportAddition:"",
    tourismusColor:"",
    tourismusKeywords:"",
    tourismusAddition:"",
    kinderColor:"",
    kinderKeywords:"",
    kinderAddition:""
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
        info: form.info,
        Modi: {
          Sport: {
            color: form.sportColor,
            keywords: form.sportKeywords,
            addition: form.sportAddition,
          },
          Tourismus: {
            color: form.tourismusColor,
            keywords: form.tourismusKeywords,
            addition: form.tourismusAddition,
          },
          Kinder: {
            color: form.kinderColor,
            keywords: form.kinderKeywords,
            addition: form.kinderAddition,
          },
        },
      };
      // Send the data to the server
      axios.post(API_URL + "/add/route", newRoute).catch((error) => {
        window.alert(error);
        return;
      });

      setForm({ file: null, info: ""});
      navigate("/");
    };
    // Read the file
    reader.readAsText(form.file);
  }
  return (
    <div>
      <h3 className="Center-heading">Add New Route</h3>
      <form onSubmit={onSubmit}>
        <div className="mode-group">
          <div className="mode">
            <div className="form-group">
              <h4>File</h4>
              <input
                type="file"
                className="form-control"
                id="file"
                onChange={(e) => updateForm("file", e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <h4>Info</h4>
              <input
                type="text"
                className="form-control"
                id="info"
                value={form.info}
                onChange={(e) => updateForm("info", e.target.value)}
              />
            </div>
          </div>
          <div className="mode">
            <h4>Sport</h4>
            <div className="form-group">
              <label htmlFor="sportColor">Color</label>
              <input
                type="text"
                className="form-control"
                id="sportColor"
                onChange={(e) => updateForm("sportColor", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sportKeywords">Keywords</label>
              <input
                type="text"
                className="form-control"
                id="sportKeywords"
                onChange={(e) => updateForm("sportKeywords", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sportAddition">Addition</label>
              <input
                type="text"
                className="form-control"
                id="sportAddition"
                onChange={(e) => updateForm("sportAddition", e.target.value)}
              />
            </div>
          </div>
          <div className="mode">
            <h4>Tourismus</h4>
            <div className="form-group">
              <label htmlFor="tourismusColor">Color</label>
              <input
                type="text"
                className="form-control"
                id="tourismusColor"
                onChange={(e) => updateForm("tourismusColor", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tourismusKeywords">Keywords</label>
              <input
                type="text"
                className="form-control"
                id="tourismusKeywords"
                onChange={(e) =>
                  updateForm("tourismusKeywords", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="tourismusAddition">Addition</label>
              <input
                type="text"
                className="form-control"
                id="tourismusAddition"
                onChange={(e) =>
                  updateForm("tourismusAddition", e.target.value)
                }
              />
            </div>
            <div className="mode">
              <h4>Kinder</h4>
              <div className="form-group">
                <label htmlFor="kinderColor">Kinder Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="kinderColor"
                  onChange={(e) => updateForm("kinderColor", e.target.value)}
                />
                <label htmlFor="kinderKeywords">Kinder Keywords</label>
                <input
                  type="text"
                  className="form-control"
                  id="kinderKeywords"
                  onChange={(e) => updateForm("kinderKeywords", e.target.value)}
                />

                <label htmlFor="kinderAddition">Kinder Addition</label>

                <input
                  type="text"
                  className="form-control"
                  id="kinderAddition"
                  onChange={(e) => updateForm("kinderAddition", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Add Route" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
