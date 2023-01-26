import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = 'http://localhost:7000';

const DataPoint = (props) => (
  <tr>
    <td>{props.title}</td>
    <td>{props.describtion}</td>
    <td>{props.geolocation}</td>
    <td>
      <Link className="btn btn-link" to={`/edit`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteDataPoint(props.title);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function DataPointList() {
  const [dataPoints, setDataPoints] = useState([]);

  // This method fetches the dataPoints from the database.
  useEffect(() => {
    async function getDataPoints() {
      console.log("Fetching dataPoints from server...");
      const response = await fetch(API_URL + `/api/allDataPoints`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        console.log("Fetched dataPoints:", data);
        setDataPoints(data);
      } else {
        console.error("Received non-array data from server:", data);
      }
    }

    getDataPoints();

    return;
  }, [dataPoints]);

  // This method will delete a dataPoint add api between 7000/api/delete
  async function deleteDataPoint(name) {
    await fetch(API_URL + `/delete/${name}`, {
      method: "DELETE"
    });

    const newDataPoint = dataPoints.filter((el) => el.name !== name);
    setDataPoints(newDataPoint);
  }

  // This method will map out the dataPoints on the table
  function dataPointsList() {
    return dataPoints.map((dataPoint) => {
      return (
        <DataPoint
          name={dataPoint.name}
          info={dataPoint.info}
          deleteDataPoint={() => deleteDataPoint(dataPoint.name)}
          key={dataPoint._id}
        />
      );
    });
  }

  // This following section will display the table with the dataPoints.
  return (
    <div>
      <h3>Data Point List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>describtion</th>
            <th>location</th>
          </tr>
        </thead>
        <tbody>{}</tbody>
      </table>
    </div>
  );
}
