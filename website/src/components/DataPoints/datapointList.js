import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://zk2ezn.deta.dev/api";

const DataPoint = (props) => (
  <tr>
    <td>{props.title}</td>
    <td>{props.description}</td>
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
      console.log("Fetching dataPoints from server..." + API_URL);
      const response = await fetch(API_URL + "/alldataPoints");

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
  }, [dataPoints]);

  // This method will delete a dataPoint add api between 7000/api/delete
  async function deleteDataPoint(title) {
    await fetch(`${API_URL}/delete/${title}`, {
      method: "DELETE"
    });

    const newDataPoints = dataPoints.filter((el) => el.title !== title);
    setDataPoints(newDataPoints);
  }

  // This method will map out the dataPoints on the table
  function DataPointList() {
    return dataPoints.map((dataPoint) => {
      return (
        <DataPoint
          title={dataPoint.title}
          description={dataPoint.description}
          geolocation={dataPoint.geolocation}
          deleteDataPoint={() => deleteDataPoint(dataPoint.title)}
          key={dataPoint._id}
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
            <th>Title</th>
            <th>Description</th>
            <th>Geolocation</th>
          </tr>
        </thead>
        <tbody>{DataPointList()}</tbody>
     </table>
   </div>
 );
}