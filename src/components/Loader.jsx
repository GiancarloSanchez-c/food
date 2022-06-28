import React, { Fragment } from 'react'
import '../assets/css/loader.scss'


const Loader = () => {
  
  return (
    <Fragment>
      <div className="pan-loader">
        <div className="loader"></div>
        <div className="pan-container">
          <div className="pan"></div>
          <div className="handle"></div>
        </div>
        <div className="shadow"></div>
      </div>
    </Fragment>
  )
}

export default Loader