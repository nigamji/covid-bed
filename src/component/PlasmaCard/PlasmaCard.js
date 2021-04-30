import React, { Fragment } from 'react'
const PlasmaCard = () => {
    return (
        <Fragment>
            <article className="plasmaCard">
                <h1>Rewa needs Plasma donors!</h1>
                <p>Rewa is struggling to find Plasma Donor and we are losing patients every single day because of Plasma Unavailability. There's nothing more noble than saving a life and you can do that, wouldn't you?</p>
            </article>
            <div className="button">
                <a className="btn btn-success" target="_blank" href="https://forms.gle/LnoaR9FtxdPnke7c8" >Become a plasma donor</a>
                <a className="btn btn-danger" target="_blank" href="https://forms.gle/22fwAExDS7RRcqr68" >Make a plasma request</a>
            </div>
        </Fragment >
    )
}

export default PlasmaCard