import axios from 'axios';

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://api-foood.herokuapp.com/recipes/');
      return dispatch({
        type: 'GET_RECIPES',
        payload: response.data,
        isLoading: false
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getDiet = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://api-foood.herokuapp.com/diets`);
      return dispatch({
        type: 'GET_DIET',
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getRecipeName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://api-foood.herokuapp.com/recipes?name=${name}`);
      return dispatch({
        type: 'GET_RECIPE_NAME',
        payload: response.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const getRecipeDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://api-foood.herokuapp.com/recipes/${id}`);
      return dispatch({
        type: 'GET_RECIPE_DETAIL',
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`https://api-foood.herokuapp.com/recipes/${id}`);
      return dispatch({
        type: 'DELETE_RECIPE',
        payload: response
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const createRecipe = (create) => {

  return async (dispatch) => {
    try {
      const response = await axios.post('https://api-foood.herokuapp.com/create', create)
      return dispatch({
        type: 'CREATE_RECIPE',
        payload: response
      })
    } catch (error) {
      console.log(error)
    }

  }
}

export const filterName = (payload) => {
  return {
    type: 'FILTER_NAME',
    payload
  }
}

export const filterHealthScore = (payload) => {
  return {
    type: 'FILTER_HEALTH_SCORE',
    payload
  }
}

export const filterDiet = (payload) => {
  return {
    type: "FILTER_DIET",
    payload
  }
}

export const filterCreated = (payload) => {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}