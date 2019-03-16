import { combineReducers } from "redux";
import {reducer as form} from 'redux-form';
import posts from './posts';

export default combineReducers({
    form: form,
    posts,
});