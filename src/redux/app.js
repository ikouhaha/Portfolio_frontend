const SET_MOBILE = 'app/setMobile';
const SET_SHOW = 'app/setShow';
const SET_TOKEN = 'app/setToken';
const SET_LOADING = 'app/setLoading';


export function setMobile(isMobile) {
    return {
        type: SET_MOBILE,
        value: isMobile
    }
}

export function setShow(show) {
    return {
        type: SET_SHOW,
        value: show
    }
}

export function setToken(token) {
    return {
        type: SET_SHOW,
        value: token
    }
}

export function setLoading(loading) {
    return {
        type: SET_SHOW,
        value: loading
    }
}


const initialState = {
    isMobile: false,
    isShow: false,
    loading: false,
    token: ""
};

export default function reducer(state = initialState, action) {
    //console.log(state)
    switch (action.type) {
        case SET_MOBILE:
            return Object.assign(
                {},
                state,
                { isMobile: action.value }
            );
        case SET_SHOW:
            return Object.assign(
                {},
                state,
                { isShow: action.value }
            );
        case SET_TOKEN:
            return Object.assign(
                {},
                state,
                { token: action.value }
            );
        case SET_LOADING:
            return Object.assign(
                {},
                state,
                { loading: action.value }
            );

        default:
            return state;
    }
}