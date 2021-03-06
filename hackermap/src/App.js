import React, { useState, useEffect } from 'react';
// import axios from 'axios'
import Geo from './Geo.js'

function App() {
  const [data, setData] = useState([])
  //Establishes connection to backend
  const eventSrc = new EventSource("http://localhost:9520/")

  eventSrc.onopen = () => console.log("opened")
  eventSrc.onerror = () => console.log("error")
  eventSrc.onmessage = (e) => {
    const newData = JSON.parse(e.data) //Turns data from backend back into a json object

    setData([newData])
    console.log(newData)
    console.log(e.data)
  }
  useEffect(() => {
    //   fetchData()
    // })
    // function fetchData() {
    //   axios.get('http://localhost:9520/logs')
    //     .then(({ data }) => {
    //       setData(data)
    // })
  })
  // eventSrc.onopen = () => console.log("opened")
  // eventSrc.onerror = () => console.log("error")
  //Does something whenever a message is recieved
  // eventSrc.onmessage = (e) => {
  //   const newData = JSON.parse(e.data) //Turns data from backend back into a json object

  //   setData([newData])
  //   console.log(newData)
  // }

  return (
    <div className="navBar">
      <div className="card" id="map">
        {data.map((info) => (
          <Geo
            key={1}
            id={info.ipAddr}
            lat={info.reqType}
            long={info.reqItem}
            city={info.reqStatus}
            region={info.reqUrl}
          // country={info.geoCountry}
          // flag={info.geoFlag}
          />
        ))}
        {/* <ipAddr

        /> */}

      </div>
    </div>
  );

}

export default App;