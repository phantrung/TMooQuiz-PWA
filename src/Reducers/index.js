import {combineReducers} from 'redux'
import {
    home_data,
    product_data,
    tapita_cmt_data,
    tapita_feature_data,
    wishlist_data,
    quoteitems,
    review_data
} from './data'

const rootReducer = combineReducers({
    home_data,
    product_data,
    tapita_cmt_data,
    tapita_feature_data,
    wishlist_data,
    quoteitems,
    review_data
});

export default rootReducer
