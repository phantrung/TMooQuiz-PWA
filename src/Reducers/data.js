import * as Constants from './constants'


const initialState = {
    home_data: null,
    product_data: [],
    tapita_cmt_data : null,
    tapita_feature_data : null,
    wishlist_data : null,
    quoteitems : null,
    review_data : null,
};

export function tapita_cmt_data(state = initialState.tapita_cmt_data, action) {
    switch (action.type) {
        case Constants.ADD_TAPITA_CMT:
            return action.data;
        default:
            return state
    }
}

export function tapita_feature_data(state = initialState.tapita_feature_data, action) {
    switch (action.type) {
        case Constants.ADD_TAPITA_FEATURE:
            return action.data;
        default:
            return state;
    }
}

export function review_data(state = initialState.review_data, action) {
    switch (action.type) {
        case Constants.ADD_REVIEW_DATA:
            return state = action.data;
        case Constants.LIST_REVIEWS:
            return [...state, action.data];
        default:
            return state;
    }
}

export function wishlist_data(state = initialState.wishlist_data, action) {
    switch (action.type) {
        case Constants.WISHLIST_DATA:
            return {...state, ...action.data};
        default:
            return state;
    }
};

export function quoteitems(state = initialState.quoteitems, action) {
    switch (action.type) {
        case Constants.ADD_CART_DATA:
            return state = action.data;
        default:
            return state;
    }
}

export function home_data(state = initialState.home_data, action) {
    switch (action.type) {
        case Constants.UPPDATE_HOME_DATA:
            return action.data;
        default:
            return state
    }
}

//item:{key:xxx, product:{}}
export function product_data(state = initialState.product_data, action) {
    switch (action.type) {
        case Constants.ADD_PRODUCT_DATA:
            return [...state, action.data];
        case Constants.UPPDATE_PRODUCT_DATA:
            return state.map(function (item) {
                if (item.key === action.key) {
                    item.product = action.product;
                }
                return item;
            });
        default:
            return state
    }
}