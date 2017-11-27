import * as ReadableAPIUtil from '../../../utils/api';
import { REPLACE_CATEGORIES } from './action.types';

export const fetchCategories = () => dispatch => {
    ReadableAPIUtil
        .fetchCategories()
        .then(categories => dispatch(replaceCategories(categories)));
};

export const replaceCategories = (categories) => {
    const reducedCategories = categories.reduce((cats, cat) => {
        return {
            ...cats,
            [cat.name]: cat
        }
    }, {});

    return {
        type: REPLACE_CATEGORIES,
        categories: reducedCategories
    }
};