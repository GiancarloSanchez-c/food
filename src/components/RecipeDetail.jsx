import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/css/detail.scss';

const RecipeDetail = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { image, name, readyInMinutes, diet, healthScore, summary, instructions } =
    useSelector(state => state.detail);

  useEffect(() => {
    dispatch(getRecipeDetail(id))
  }, [id, dispatch])

  return (
    <Fragment>
    <div className="img-detail">
      <main className="grid-container">
        <section className="header-img">
          <img src={image} alt="Img not found" width="30%" />
        </section>

        <section className="section-1">
          <h1 className="title-header">{name}</h1>
          <h5 className="title-h5">DIETS:</h5>
          {diet?.map(type => (
            <div key={type}>
              <p className="font-diet"> {`${type[0].toUpperCase()}${type.slice(1)}`} </p>
            </div>

          ))}
          <p className="score">
            Health score: {healthScore}/100
            <progress className="progress-bar" max="100" value={healthScore} />
          </p>
          <p className="minutes"> Ready in : {readyInMinutes} minutes </p>
          <h5 className="title-h5">Summary:</h5>
          <p className="section-resume"> {summary?.replace(/<[^>]+>/g, "")} </p>
          <h5 className="title-h5"> Instructions</h5>
          <div>
            {
              instructions?.length > 0 ? <p className="section-resume">{instructions}</p> : <p className="not">No instructions found</p>
            }
          </div>
        </section>

      </main></div>
    </Fragment>

  )
}

export default RecipeDetail