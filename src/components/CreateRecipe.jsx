import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, createRecipe, getDiet } from '../redux/actions';
import { useHistory } from 'react-router-dom';
import '../assets/css/create.scss'

const CreateRecipe = () => {


  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    image: '',
    summary: '',
    diets: [],
    healthScore: 0,
    instructions: ''
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector(state => state.diets);

  useEffect(() => {
    document.title = 'Create Recipe'
    dispatch(getRecipes());
    dispatch(getDiet());
  }, [dispatch])

  const validateName = /^[a-zA-Z\s]+$/;
  const validateImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  const validations = (input) => {
    const errors = {};
    if (!input.name.length) {
      errors.name = 'Name is required';
    }
    if (!validateName.test(input.name)) {
      errors.name = 'Name must be letters only';
    }
    if (input.image && !validateImage.test(input.image)) {
      errors.image = 'Image must be a valid URL';
    }
    if (!input.summary.length) {
      errors.summary = 'Summary is required';
    }
    if (input.summary.length < 30) {
      errors.summary = 'Summary must be at least 30 characters';
    }
    if (input.healthScore < 0 || input.healthScore > 100) {
      errors.healthScore = 'Health score must be between 0 and 100';
    }
    if (!input.instructions.length) {
      errors.instructions = 'Instructions are required';
    }
    if (input.instructions.length < 30) {
      errors.instructions = 'Instructions must be at least 30 characters';
    }
    return errors;
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validations({
      ...input,
      [e.target.name]: e.target.value
    }))
  };

  const handleCheck = (e) => {
    // Si la casilla de verificación está marcada, agregamos el valor de la identificación en el array
    if (e.target.checked && !input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
    // Si la casilla de verificación no está marcada, eliminamos el valor de la identificación del array 
    else if (!e.target.checked) {
      setInput({
        ...input,
        diets: input.diets.filter(diet => diet !== e.target.value)
      })
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Si no hay errores, enviamos el formulario
    if (Object.keys(errors).length === 0 && input.diets.length > 0) {
      // despachamos la acción de crear receta
      dispatch(createRecipe(input));
      // alerta de que la receta fue creada
      alert('Cool, Recipe created')
      // reseteamos el formulario
      setInput({
        name: '',
        image: '',
        summary: '',
        diets: [],
        healthScore: 0,
        instructions: ''
      })
      // redireccionamos a la pantalla de listado de recetas
      history.push('/home');
    } else {
      // si hay errores, los mostramos en pantalla
      alert('Please fix errors before submitting')
    }
  }

  

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container"  >
        <div className="form">
          <h1 className="title-form">Create a new Recipe</h1>
        </div>
        <div className="form-group">
          <label className="label-form" htmlFor="image">Image:</label>
          <input className="input-form" type="url" name="image" value={input.image} autoComplete="off" placeholder=" URL Image (Optional)..." onChange={handleChange} />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>
        <div className="form-group">
          <label className="label-form" htmlFor="name">Name:</label>
          <input className="input-form" type="text" name="name" value={input.name} autoComplete="off" placeholder="Title or Name for the recipe" onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label className="label-form" htmlFor="summary">Summary:</label>
          <textarea className="input-form" type="textarea" name="summary" value={input.summary} autoComplete="off" placeholder="Enter a summary" onChange={handleChange} />
          {errors.summary && <p className="error">{errors.summary}</p>}
        </div>
        <div className="form-group">
          <label className="label-form" htmlFor="healthScore">Health Score:</label>
          <input className="input-form" min="0" max="100" type="number" name="healthScore" value={input.healthScore} autoComplete="off" onChange={handleChange} />
          <span>{input.healthScore}</span>
          {errors.healthScore && <p className="error">{errors.healthScore}</p>}
        </div>
        <div className="form-group">
          <label className="label-form" htmlFor="instructions">Instructions:</label>
          <textarea className="input-form" type="textarea" name="instructions" value={input.instructions} autoComplete="off" placeholder="Enter a instructions" onChange={handleChange} />
          {errors.instructions && <p className="error">{errors.instructions}</p>}
        </div>
        <div className="diet-group">
          <label className="label-form">Diets: </label> <br />
          {
            diets.map((d) => (
              <label className="label-form " htmlFor={d.name} key={d.name}>
                <input type="checkbox" name="diets" value={d.name} onChange={handleCheck} />
                {d.name} {" "}
              </label>
            ))
          }
        </div>
        <div className="btn-container">
          {
            errors.name || errors.summary || errors.healthScore || errors.instructions || errors.image ? (
              <button className="btn-submit" type="submit" disabled>Create Recipe</button>
            ) : (
              <button className="btn-submit" type="submit">Create recipe</button>
            )
          }
          <button className='btn-cancel' onClick={() => history.push('/home')}>Cancel</button>
        </div>

      </form>
    </div>
  );
}

export default CreateRecipe