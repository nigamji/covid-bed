import { GET_DATA, DATA_ERROR, GET_AVAIL_BEDS, GET_FILLED_BEDS, COUNT_ERROR } from './types'
import axios from 'axios'

export const getDetails = () => async dispatch => {
    try {
        const res = await axios.get('/api/details')
        dispatch({
            type: GET_DATA,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: DATA_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
export const getAvailBeds = () => async dispatch => {
    try {
        const res = await axios.get('/api/details/avail-beds')
        dispatch({
            type: GET_AVAIL_BEDS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: COUNT_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
export const getFilledBeds = () => async dispatch => {
    try {
        const res = await axios.get('/api/details/filled-beds')
        dispatch({
            type: GET_FILLED_BEDS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: COUNT_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}