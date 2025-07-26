import React, { useState, useRef, useEffect } from 'react'
import './Nav.scss'
import { gsap } from 'gsap'
import { scrollToSection } from '../components/ScrollToSection'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId)
    setIsOpen(false) // ✅ auto close mobile menu on link click
  }

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    })
  }, [])

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
      })
    }
  }, [isOpen])

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        <Link to="https://portfolio-adarsh.onrender.com/" onClick={() => handleNavClick('home')} className="logo">Adarsh<span>Portfolio</span></Link>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          <a onClick={() => handleNavClick('home')}>Home</a>
          <a onClick={() => handleNavClick('about')}>About</a>
          <a onClick={() => handleNavClick('skills')}>Skills</a>
          <a onClick={() => handleNavClick('projects')}>Projects</a>
          <a onClick={() => handleNavClick('contact')}>Contact</a>
        </div>

        {/* Mobile icon */}
        <div className="menu-icon" onClick={() => setIsOpen(true)}>
          <i className="ri-menu-line"></i>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu" ref={mobileMenuRef}>
        <div className="close-icon" onClick={() => setIsOpen(false)}>
          <i className="ri-close-line"></i>
        </div>
        <div className="nav-links-mobile">
          <a onClick={() => handleNavClick('home')}>Home</a>
          <a onClick={() => handleNavClick('about')}>About</a>
          <a onClick={() => handleNavClick('skills')}>Skills</a>
          <a onClick={() => handleNavClick('projects')}>Projects</a>
          <a onClick={() => handleNavClick('contact')}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Nav