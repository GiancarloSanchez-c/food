/* eslint-disable jsx-a11y/anchor-is-valid */
import '../assets/css/pagination.scss';

const Pagination = ({ recipesPerPage, allRecipes, pagination }) => {

  const pageNumbers = [];
  // La función Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.r
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
    // pageNumber pushea el numero de la pagina(1-2-3-...-11-12)
  }

  return (
    <div className="container-pagination">
      {
        pageNumbers?.map(number => (
          <div key={number}>
            <span >
              <button className="index" onClick={() => pagination(number)}>{number}</button>
            </span>
            
          </div>
        ))
      }
    </div>
  )
}

export default Pagination