import axios from '../custom-axios/axios';
import qs from 'qs';

const IngredientsService = {

    fetchIngredientsPaged : (page, size) => {
        return axios.get("/ingredients", {
            headers : {
                'page' : page,
                'size' : size
            }
        })
    },

    createIngredient : (ingredient) => {
        const formParams = qs.stringify(ingredient);
        return axios.post("/ingredients", formParams);
    },

    editIngredient : (ingredient, ingredientName) => {
        const formParams = qs.stringify(ingredient);
        return axios.patch(`/ingredients/${ingredientName}`, formParams);
    },

    getIngredient : (name) => {
        return axios.get(`/ingredients/${name}`);
    },

    deleteIngredient : (name) => {
        return axios.delete(`/ingredients/${name}`);
    },

    searchIngredients : (term) => {
      return axios.get(`/ingredients?term=${term}`);
    },

    getAllPizzasWithIngredient : (name) => {
        return axios.get(`/ingredients/${name}/pizzas`);
    }

};

export default IngredientsService;

