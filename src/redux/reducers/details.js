import { GET_DATA, DATA_ERROR, GET_AVAIL_BEDS, GET_FILLED_BEDS, COUNT_ERROR } from '../actions/types'


const inititalState = {
    bedDetails: [],
    available: null,
    filled: null,
    loading: true,
    error: {}
};

const detail = (state = inititalState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_DATA:
            return {
                ...state,
                bedDetails: payload,
                loading: false
            }
        case DATA_ERROR:
            return {
                ...state,
                bedDetails: [],
                error: payload,
                loading: false
            }
        case GET_AVAIL_BEDS:
            return {
                ...state,
                available: payload,
                loading: false
            }
        case GET_FILLED_BEDS:
            return {
                ...state,
                filled: payload,
                loading: false
            }
        case COUNT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}

export default detail