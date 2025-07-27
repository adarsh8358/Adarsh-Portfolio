import React from 'react'
import './Footer.scss'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2>Adarsh Kushwaha</h2>
        <p>© {new Date().getFullYear()} All rights reserved.</p>

        <div className="socials">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <i className="ri-github-fill"></i>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i className="ri-linkedin-box-fill"></i>
          </a>
          <Link to="mailto:adarshkushwaha8358@gmail.com">
            <i className="ri-mail-fill"></i>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer