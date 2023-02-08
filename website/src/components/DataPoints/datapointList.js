import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://zk2ezn.deta.dev/api";

const DataPoint = (props) => (
  <tr>
    <td>{props.type}</td>
    <td>{props.title}</td>
    <td>
      {props.coordinate.latitude}:{props.coordinate.longitude}
    </td>
    <td>
      <table>
        <tbody>
          {props.details.map((detail,detailIndex) => (
            <tr key={detailIndex}>
              <td>Name:{detail.name}</td>
              <td>Details:{detail.info}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </td>
    <td>
      <Link className="btn btn-link" to={`/editPoint`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
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
  const [dataPoint, setDataPoints] = useState([]);

  // This method fetches the dataPoints from the database.
  useEffect(() => {
    async function getDataPoints() {
      console.log("Fetching routes from cache...");
      let data2 = localStorage.getItem("datapoint");
      if (data2) {
        console.log("Fetched routes from cache:", JSON.parse(data2));
        setDataPoints(JSON.parse(data2));
        return;
      }
      console.log("Fetching dataPoints from server..." + API_URL);
      const response = await fetch(API_URL + "/alldatapoints");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        console.log("Fetched dataPoints:", data);
        setDataPoints(data);
      } else {
        console.error("Received non-array data from server:", data);
      }
    }

    getDataPoints();

    return;
  }, []);

  // This method will delete a dataPoint add api between 7000/api/delete
  async function deleteDataPoint(title) {
    await fetch(`${API_URL}/deleteDP/${title}`, {
      method: "DELETE",
    });
    const newDataPoints = dataPoint.filter((el) => el.title !== title);
    setDataPoints(newDataPoints);
  }

  // This method will map out the dataPoints on the table
  function DataPointList() {
    return dataPoint.map((dataPoint) => {
      return (
        <DataPoint
          key={dataPoint._id}
          type={dataPoint.type}
          title={dataPoint.title}
          coordinate={{
            latitude: dataPoint.coordinate.latitude,
            longitude: dataPoint.coordinate.longitude,
          }}

          details={dataPoint.details.map((detail,detailIndex) => ({
            name: detail.name,
            info: detail.info,
            detailkey: detail.detailIndex
          }))}

          deleteDataPoint={() => deleteDataPoint(dataPoint.details.name)}
        />
      );
    });
  }

  // This following section will display the table with the dataPoints.
  return (
    <div>
      <h3>DataPoint List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>Coordinate</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>{DataPointList()}</tbody>
      </table>
    </div>
  );
}
