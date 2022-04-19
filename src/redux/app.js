const SET_MOBILE = 'app/setMobile';
const SET_SHOW = 'app/setShow';
const LOADING = 'app/loading';
const DONE = 'app/done';
const RESET_LOADING = 'app/resetLoading';

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

export function loading() {
    
    return {
        type: LOADING
    }
}

export function done() {

    return {
        type: DONE
    }
}

export function resetLoading() {

    return {
        type: RESET_LOADING
    }
}




const initialState = {
    isMobile: false,
    isShow: false,
    loading: false,
    loadingCount: 0
};

const loadingDoneHandling = (state,action) =>{
    console.log("returnObj")
    let loadingCount = state.loadingCount - 1;
    let returnObj = {}
    if(loadingCount===0){
        returnObj["loading"] = false
    }
   
    returnObj["loadingCount"] = loadingCount
    return returnObj;
}

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
        case LOADING:
            return Object.assign(
                {},
                state,
                { loading: true,loadingCount:state.loadingCount+1 }
            );
        case DONE:
            return Object.assign(
                {},
                state,
                loadingDoneHandling(state)
            );
        default:
            return state;
    }
}