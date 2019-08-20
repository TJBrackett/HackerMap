import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Geo from './Geo.js'

function App() {
  const [data, setData] = useState([])
  //Establishes connection to backend
  const eventSrc = new EventSource("http://localhost:9520/logs")
  // useEffect(() => {
    //   fetchData()
    // })
    // function fetchData() {
    //   axios.get('http://localhost:9520/logs')
    //     .then(({ data }) => {
    //       setData(data)
    // })
  // })

  //Does something whenever a message is recieved
  eventSrc.onmessage = (e) => {
    const data = JSON.parse(e.data) //Turns data from backend back into a json object
    const randEntry = Math.floor(Math.random() * data.length) //Gets a random number based on length of data array
    console.log(data[randEntry].geoCity) //Console logs random city
  }
  return (
    <div className="test" id="map">
      {data.map((info) => (
        <Geo
          key={info.PK_geo}
          id={info.PK_geo}
          lat={info.geoLat}
          long={info.geoLong}
          city={info.geoCity}
          region={info.geoRegion}
          country={info.geoCountry}
          flag={info.geoFlag}
        />
      ))}
    </div>
  );

}

export default App;

