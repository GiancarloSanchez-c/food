import React from 'react'
import '../assets/css/footer.scss';

const Footer = () => {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="https://github.com/GiancarloSanchez-c"><i className="icon ion-social-github"></i></a>
          <a href="https://www.linkedin.com/in/giancarlo-s%C3%A1nchez-rodriguez/"><i className="icon ion-social-linkedin"></i></a>
        </div>
        <p className="copyright">Bootcam Soy Henry - Giancarlo Sanchez © 2022</p>
      </footer>
    </div>
  )
}

export default Footer