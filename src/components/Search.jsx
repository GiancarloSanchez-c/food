import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../redux/actions"
import '../assets/css/search.scss'

const Search = () => {

  const [name, setName] = useState("");
  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    if (!name) {
      e.preventDefault()
      return alert('Enter a recipe')
    }
    e.preventDefault()
    dispatch(getRecipeName(name))
    setName("")

  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} >
        <input className='input-search' type="text" placeholder="Search..." value={name} onChange={handleInputChange} />
      </form>
    </div>
  )
}


export default Search