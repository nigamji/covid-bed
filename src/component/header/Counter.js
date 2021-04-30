import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import AnimatedNumber from 'animated-number-react'
const Counter = (props) => {
    return (
        <Fragment>
            <div className="container counter">
                <div className="counter-box success">
                    {props.details && props.details.loading === false ?
                        <h1><AnimatedNumber value={props.details.available}
                            formatValue={(value) => value.toFixed(0)} />
                        </h1> : <h1>0</h1>}
                    <h3>Available Beds</h3>
                </div>
                <div className="counter-box danger">
                    {props.details && props.details.loading === false ?
                        <h1 ><AnimatedNumber value={props.details.filled}
                            formatValue={(value) => value.toFixed(0)} /></h1> : <h1>0</h1>}
                    <h3>Filled Beds</h3>
                </div>
            </div>
            <p className="content py-2">This is a voluntary (non-official) initiative and this list is indicative of the  data filled by hospital management itself. We recommend that you check with the hospital before taking the patient.The list will be updated everytime any organisation updates its information.</p>

            <hr />
        </Fragment>
    )
}
const mapStateToProps = state => ({
    details: state.details
})
export default connect(mapStateToProps, {})(Counter);