import { CHANGE_PAGE } from "../actions/action-types";
import React from 'react';
import Img from '../components/Img.jsx';

const initialState = {
  page:<Img/>
};

function rootReducer(state = initialState, action) {
 
  if (action.type === CHANGE_PAGE) {
    return Object.assign({}, state, {
      page: action.payload
    });
  }

  return state;
}
export default rootReducer;