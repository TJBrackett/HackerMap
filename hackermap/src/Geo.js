import react from 'react'

const Geo = ({ id, lat, long, city, region, country, flag }) => {
    return (
        <div>
            <p>{id}</p>
            <p>{lat}</p>
            <p>{long}</p>
            <p>{city}</p>
            <p>{region}</p>
            <p>{country}</p>
            <p>{flag}</p>
        </div>
    )
}

export default Geo