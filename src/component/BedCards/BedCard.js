import React from 'react'
import Moment from 'react-moment'
const BedCard = ({ detail: { name, location, beds, date } }) => {
    return (
        <div className="bedCard">
            <h4>{name}</h4>
            <div className="bedCard-header">
                <label><i className="fas fa-map-marker min-none"></i> Location:</label>
                {location}
                <br />
                <label><i className="fas fa-clock min-none"></i> Date:</label>
                <Moment format="YYYY/MM/DD">{date}</Moment>
            </div>
            <p>{beds.map(bed => <div>
                <span>{bed.title}</span>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div>
                        <label>Available: </label>
                        <p>{bed.available}</p>
                    </div>
                    <div>
                        <label>Filled: </label>
                        <p>{bed.filled}</p>
                    </div>
                </div>
            </div>)}</p>
        </div>
    )
}

export default BedCard
