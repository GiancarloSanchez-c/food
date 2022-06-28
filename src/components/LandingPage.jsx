import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/landingPage.scss'

const LandingPage = () => {
  return (
    <div className="container-page ">
      <section className="one">
        <h1 className="title-page"> Welcome <br /> to the best <br /> Recipes </h1>
        <Link to='/home' ><button className="btn"> Read More </button>
        </Link>
      </section>

      <section className="two">
        <div className="img-section"></div>
      </section>


    </div >
  )
}

export default LandingPage