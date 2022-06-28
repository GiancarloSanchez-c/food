/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect } from 'react'
import '../assets/css/nav.scss'
import Search from './Search'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRecipes } from '../redux/actions'

const Navbar = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch])

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getRecipes());
  }

  return (
    <Fragment>
      <header>
        <div className="bg-img">
          <div className="container-header">
            <div className="container-header-txt">
              <div className="header-txt">
                <h1>The best recipes</h1>
                <h1>and <br/> the best food</h1>
              </div>
            </div>
            <div className="topnav">
              <a href="#" onClick={handleClick}>Home</a>
              <Link to={'/create'}>Create Recipe</Link>
              <Search />
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default Navbar


/*
  <nav className='nav-container'>
        <div className="menu">
          <div>
            <h1 className="title-nav">API FOOD</h1>
          </div>
          <ul className="links">

            <li className="link-list">
              <a href="#" onClick={handleClick}>Home</a>
            </li>

            <li>
              <Link to={'/create'}>Create Recipe</Link>
            </li>

          </ul>
        </div>
      </nav>

*/