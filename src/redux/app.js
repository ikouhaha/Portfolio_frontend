const SET_MOBILE = 'app/setMobile';
const SET_SHOW = 'app/setShow';
const LOAD = 'app/load';


export function load(value) {
    return {
        type: LOAD,
        
    }
}

export function setMobile(isMobile) {
    return {
        type: SET_MOBILE,
        value: isMobile
    }
}

export function setShow(isShow) {
    return {
        type: SET_SHOW,
        value: isShow
    }
}

const initialState = {
    isMobile: false,
    isShow: false
};

export default function reducer(state = initialState, action) {
    //console.log(state)
    //console.log(action.type)
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

        default:
            return state;
    }
}