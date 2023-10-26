import { FETCH_RESUMES, FETCH_ALL_RESUMES, LOADING_RESUMES } from '../actions/types';

export const initialState = {
    resumes:null,
    allResumes:null,
    loading:false,
};

export const resumeReducer = (state, action)=> {
    const { type, payload } = action;
    switch (type) {
        case LOADING_RESUMES:
            return{
                ...state,
                loading:true
            };
        case FETCH_RESUMES:
            return{
                ...state,
                resumes:payload
            };
        case FETCH_ALL_RESUMES:
            return{
                ...state,
                allResumes:payload
            };
        default:
            return state;
    }
};