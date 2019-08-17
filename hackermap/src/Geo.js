import React from 'react';

const Geo = ({ id, lat, long, city, region, country, flag }) => {
    return (
        <div>
            <p>id = {id}</p>
            <p>lat = {lat}</p>
            <p>long = {long}</p>
            <p>city = {city}</p>
            <p>region = {region}</p>
            <p>country = {country}</p>
            <p>flag = {flag}</p>
        </div>
    )
}

export default Geo