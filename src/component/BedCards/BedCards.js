import React from 'react'
import { connect } from 'react-redux'
import BedCard from './BedCard'
const BedCards = (props) => {
    return (
        <div className="bedCardsStyle">
            {props.details && props.details.loading === false ?
                props.details.bedDetails.map(bedDetail =>
                    <BedCard detail={bedDetail} />) : <p>hello</p>}
        </div>
    )
}
const mapStateToProps = state => ({
    details: state.details
})
export default connect(mapStateToProps)(BedCards);
