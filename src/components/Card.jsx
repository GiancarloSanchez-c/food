import { Link } from 'react-router-dom';
import '../assets/css/card.scss'
import { deleteRecipe } from '../redux/actions'
import { useDispatch } from 'react-redux'

const Card = ({ name, image, id, diet, healthScore }) => {

  const regexUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  const dispatch = useDispatch();

  const deleteRecipes = (e) => {
    if (window.confirm('Are you sure to delete this recipe??')) {
      dispatch(deleteRecipe(id))
    }
    else {
      e.preventDefault();
    }
  }

  return (
    <div className="card-container">
      <div className="card-container u-clearfix">
        <div className="card-body">
          <span className="card-number card-circle subtle">{id}</span>
          <h2 className="card-title"> {name} </h2>
          <span className="card-description subtle">Health Score: {healthScore}</span>
          <span className="card-description subtle">Diets:
            {
              diet?.map((d) => (
                <div key={d} className="type">
                  <ul >
                    <li key={d} >
                      {`${d[0].toUpperCase()}${d.slice(1)}`}
                    </li>
                  </ul>
                </div>

              ))
            }
          </span>
          <div className="card-read">
            <Link to={`/home/${id}`} className="card-read-link">Read</Link>
          </div>
        </div>
        <img src={image} alt="" className="card-media" />
      </div>
      <div className="card-shadow"></div>
      {
        regexUUID.test(id) ? <button className="btn-delete" onClick={() => deleteRecipes(id)}>Delete</button> : ''

      }
    </div>
  )
}

export default Card

/**
 <h2 className="title">{name}</h2>
        <p className="text-card">Health Score</p>
        <p className="text-card">{healthScore}</p>
        <img className="img-card" src={image} alt='' />
        <p> DIETS:  </p>
        {
          diet?.map((d) => (
            <div key={d} className="type">
              <ul >
                <li key={d} >
                  {`${d[0].toUpperCase()}${d.slice(1)}`}
                </li>
              </ul>
            </div>

          ))
        }
        {
          regexUUID.test(id) ? <button className="btn-delete" onClick={() => deleteRecipes(id)}>Delete</button> : ''

        }
        <Link to={`/home/${id}`}><button className="btn-more">See more</button></Link>

 */