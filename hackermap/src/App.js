import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Geo from './Geo.js'

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get('http://localhost:9520/logs')
      .then((res) => {
        return setData(res)
      })
  })

  return (
    <div className="test" id="map">
      {data.map(info =>  {
        <Geo
          id={info.PK_geo}
          lat={info.geoLat}
          long={info.geoLong}
          city={info.geoCity}
          region={info.geoRegion}
          country={info.geoCountry}
          flag={info.geoFlag}
        />
      })}
    </div>
  );
}

export default App;
