const CONTENT_TYPE = 'application/json';
const API_KEY = process.env.API_KEY;
const AUTHORIZATION = process.env.AUTHORIZATION;

export const DATA = {
    MEAL_TYPES: 'mealTypes',
}
export const META_DATA = {
    CUISINES: 'cuisines',
    MAIN_INGREDIENT: 'mainIngredients',
    DISH_TYPES: 'dishTypes',
    DIETARY_NEEDS: 'dietaryNeeds',
    TECHNIQUES: 'techniques',
    CATEGORY: 'categories'
};

export const RECIPES = 'recipes';

export const HEADERS = {
    'Content-Type': CONTENT_TYPE,
    'api_key': API_KEY,
    'authorization': AUTHORIZATION,
};

export const REFERENCE_CONTENT_TYPES = [
    {
        name: META_DATA.CUISINES,
        uid: process.env.CUISINES_CONTENT_TYPE_UID
    },
    {
        name: DATA.MEAL_TYPES,
        uid: process.env.MEALS_CONTENT_TYPE_UID
    },
    {
        name: META_DATA.MAIN_INGREDIENT,
        uid: process.env.MAIN_INGREDIENT_CONTENT_TYPE_UID
    },
    {
        name: META_DATA.DISH_TYPES,
        uid: process.env.DISH_TYPES_CONTENT_TYPE_UID
    },
    {
        name: META_DATA.DIETARY_NEEDS,
        uid: process.env.DIETARY_NEEDS_CONTENT_TYPE_UID
    },
    {
        name: META_DATA.TECHNIQUES,
        uid: process.env.TECHNIQUES_CONTENT_TYPE_UID
    },
    {
        name: META_DATA.CATEGORY,
        uid: process.env.CATEGORY_CONTENT_TYPE_UID
    },    
];


export const PAGE_SIZE = 100;
