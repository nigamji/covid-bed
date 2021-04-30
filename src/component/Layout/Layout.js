import React from 'react'
import { Link } from 'react-router-dom'
const Layout = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-bed"></i>{' '}Rewa Covid Beds</Link>
            </h1>
        </nav>
    )
}

export default Layout