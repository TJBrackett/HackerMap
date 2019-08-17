import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Geo from './Geo.js'
import emoji from 'emoji-flags'


function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  })
  function fetchData() {
    axios.get('http://localhost:9520/logs')
      .then(({ data }) => {
        setData(data)
      })
  }
  // function apiFlag(flag) {

  // }
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

