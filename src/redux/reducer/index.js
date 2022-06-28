const initialState = {
  recipes: [],
  allRecipes: [],
  isLoading: true,
  diets: [],
  detail: []
}


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        isLoading: action.loading
      }
    case 'CREATE_RECIPE':
      return {
        ...state,
      }
    case 'GET_RECIPE_NAME':

      return {
        ...state,
        recipes: action.payload,
      }

    case 'GET_RECIPE_DETAIL':
      return {
        ...state,
        detail: action.payload
      }
    case 'GET_DIET':
      return {
        ...state,
        diets: action.payload
      }
    case 'DELETE_RECIPE':
      const deleteRecipe = state.allRecipes.filter(recipe => recipe.id !== action.payload)
      return {
        ...state,
        recipes: deleteRecipe
      }
    case 'FILTER_CREATED':
      const allRecipes = state.allRecipes
      const createFilter = action.payload === "created"
        ? allRecipes.filter(el => el.createdByUser)
        : allRecipes.filter(el => !el.createdByUser)
      return {
        ...state,
        recipes: createFilter
      }

    case 'FILTER_DIET':
      const allDiets = state.allRecipes
      const dietFilter = allDiets.filter(rec => rec.diet.includes(action.payload));
      return {
        ...state,
        recipes: dietFilter
      }
    case 'FILTER_NAME':
      const allNames = state.allRecipes
      const sortedName = action.payload === 'asc'
        ? allNames.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0
        })
        : allNames.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0
        })
      const ordenScore = action.payload === 'low'
        ?
        state.recipes.sort((a, b) => {
          if (a.healthScore > b.healthScore) return 1;
          if (b.healthScore > a.healthScore) return -1;
          return 0;
        })
        :
        state.recipes.sort((a, b) => {
          if (a.healthScore > b.healthScore) return -1;
          if (b.healthScore > a.healthScore) return 1;
          return 0;
        })
      return {
        ...state,
        recipes: sortedName || ordenScore
        
      };
    case 'FILTER_HEALTH_SCORE':
      const orderScore = action.payload === 'low'
        ?
        state.recipes.sort((a, b) => {
          if (a.healthScore > b.healthScore) return 1;
          if (b.healthScore > a.healthScore) return -1;
          return 0;
        })
        :
        state.recipes.sort((a, b) => {
          if (a.healthScore > b.healthScore) return -1;
          if (b.healthScore > a.healthScore) return 1;
          return 0;
        })
      return {
        ...state,
        recipes: orderScore
      }
    default:
      return state;
  }
}
export default rootReducer;