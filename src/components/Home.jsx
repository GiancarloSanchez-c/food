import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { filterCreated, getRecipes, getDiet, filterDiet, filterName, filterHealthScore } from '../redux/actions'
import Card from './Card'
import Pagination from './Pagination'
import Loader from './Loader'
import Navbar from './Navbar'
import '../assets/css/home.scss'
import NotFound from './NotFound'
import Footer from './Footer'


const Home = () => {

  // Estado para la pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  // cantidad de recetas por pagina
  const recipesPerPage = 10;
  // estado para el filtro de nombre
  const [, setName] = useState("");
  // estado para el filtro del healthScore
  const [, setOrderScore] = useState("")

  // estado para traer toda las recetas de la api 
  const allrecipes = useSelector(state => state.recipes);
  // estado para traes todas las recetas precargadas
  const diets = useSelector(state => state.diets);
  // estado que traes el loader, si está en true cargara la pagina
  const isLoading = useSelector(state => state.isLoading);
  // dispatch -- Despachara las acciones de redux
  const dispatch = useDispatch();

  //indice de las recetas por pagina actual
  const indexOfLastRecipe = currentPage * recipesPerPage;
  // indice la paginacion de las recetas por pagina actual
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  // slice => toma el indice la primera pagina y corta en la ultima pagina / 1 - 9
  const currentRecipes = allrecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiet());
  }, [dispatch])

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getRecipes());
  }

  const handleFilterDiet = (e) => {
    e.preventDefault()
    dispatch(filterDiet(e.target.value));
    setCurrentPage(1);
  }

  const handleFilterName = (e) => {
    e.preventDefault();
    dispatch(filterName(e.target.value));
    setCurrentPage(1);
    setName(e.target.value);
  }

  const handleFilterScore = (e) => {
    e.preventDefault();
    dispatch(filterHealthScore(e.target.value));
    setCurrentPage(1);
    setOrderScore(e.target.value);
  }

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="wrapper">
        <Link to='/create' >
          <button className="btn-white btn-animated btn-create" >Create Recipe</button>
        </Link>
        <button className="btn-white btn-animated btn-create" onClick={handleClick}>Reset all Recipes </button>
      </div>

      <div className="filter-select " >
        <select className="selected" onChange={handleFilterName} >
          <option >Order By Name or Health score</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="low"> Lowest to highest score </option>
          <option value="high"> Highest to lowest score </option>
        </select>

        <select className="selected" onChange={handleFilterCreated}>
          <option value=''>My recipe created</option>
          <option value='created'>My recipes</option>
        </select>
        <select className="selected" onChange={handleFilterDiet} >
          <option >Filter By Diets</option>
          {diets?.map((d) => (
            <option key={d.name} value={d.name}>
              {`${d.name[0].toUpperCase()}${d.name.slice(1)}`} {/* Cambia la primera palabra en mayúscula  */}
            </option>
          ))}
        </select>
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes={allrecipes.length}
        pagination={pagination}
      />
      <>
        {
          isLoading ?
            (<Loader />)
            : typeof currentRecipes[0] === 'object'
              ? (
                <div className="recipes">
                  {
                    currentRecipes?.map(recipe => (
                      <Card key={recipe.id} name={recipe.name} image={recipe.image} healthScore={recipe.healthScore} diet={recipe.diet} id={recipe.id} />
                    ))
                  }
                </div>
              ) : (
                <div>
                  <NotFound />
                </div>
              )
        }
      </>
      <Footer />
    </div>
  )
}

export default Home