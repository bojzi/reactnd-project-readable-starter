import * as ReadableAPIUtil from '../../../utils/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const REPLACE_CATEGORIES = 'REPLACE_CATEGORIES';

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

    console.log(reducedCategories);

    return {
        type: REPLACE_CATEGORIES,
        categories: reducedCategories
    }
};