import React, { useEffect, useRef, useState } from 'react'
import './Home.scss'
import { gsap } from 'gsap'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { scrollToSection } from '../../components/ScrollToSection'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ThankYouPopup from '../../components/ThankYouPopup'

const Home = () => {
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const aboutRef = useRef(null)
  const containerRef = useRef(null)
  const sectionRef = useRef(null)

  const [repos, setRepos] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // Contact form submit
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('https://adarsh-portfolio-p58q.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Server Error')

      toast.success('Message sent successfully!')
      reset()
    } catch (error) {
      toast.error('Failed to send message. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Scroll to section
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId)
    setMenuOpen(false)
  }

  // Skills list
  const skills = [
    { name: 'HTML', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Express', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'GSAP', img: 'https://seeklogo.com/images/G/gsap-logo-1A6165D6F7-seeklogo.com.png' },
    { name: 'Three.js', img: 'https://threejs.org/files/favicon.ico' },
    { name: 'Skiper UI', img: 'https://img.icons8.com/color/96/design.png' },
  ]

  // Hero animations
  useEffect(() => {
    gsap.from(textRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    })

    gsap.from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out',
    })
  }, [])

  // About section animation
  useEffect(() => {
    gsap.from(aboutRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
      },
    })
  }, [])

  gsap.registerPlugin(ScrollTrigger)

  // Skills animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      tl.from('.skill-item', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // GitHub repos
  useEffect(() => {
    fetch('https://api.github.com/users/adarsh8358/repos')
      .then(res => res.json())
      .then(data => {
        const pinned = data.slice(0, 6)
        setRepos(pinned)
      })
      .catch(err => console.error('GitHub API error:', err))
  }, [])

  // Projects animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Contact animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Popup delay (always shows after refresh)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 700) // ⏳ 2 seconds delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <main>
      {showPopup && <ThankYouPopup onClose={() => setShowPopup(false)} />}

      <Nav />

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content" ref={textRef}>
          <h1>Hello, I'm <span>Adarsh</span></h1>
          <h2>Full Stack Developer</h2>
          <p>I build responsive, interactive websites with React, Node,<br /> Express, and MongoDB.</p>

          <div className="social-icons">
            <a href="https://github.com/adarsh8358" target="_blank" rel="noopener noreferrer">
              <i className="ri-github-fill"></i>
            </a>
            <a href="https://www.linkedin.com/in/adarsh-kushwaha-a39259272" target="_blank" rel="noopener noreferrer">
              <i className="ri-linkedin-box-fill"></i>
            </a>
            <a
              href="https://wa.me/918358958635?text=Hi%20Adarsh%2C%20I%20just%20visited%20your%20portfolio.%20Can%20I%20get%20more%20info%20about%20your%20services%3F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-whatsapp-line"></i>
            </a>
          </div>

          <button onClick={() => handleNavClick('contact')}>Get in Touch</button>
        </div>

        <div className="hero-image" ref={imageRef}>
          <img src="./image11.jpeg" alt="Adarsh Profile" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container" ref={aboutRef}>
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              I'm <strong>Adarsh</strong>, a passionate <strong>full-stack MERN developer</strong> who loves to build fast,
              <strong> responsive</strong>, and <strong>dynamic</strong> web applications using the <strong>MERN</strong> stack.
            </p>
            <p>
              My focus is on writing clean, scalable code and creating user-friendly experiences.
              I'm also exploring animation libraries like GSAP and 3D tools like Three.js.
            </p>
          </div>
          <div className="about-image">
            <img src="./image2.jpeg" alt="Adarsh About" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section" ref={containerRef}>
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <img src={skill.img} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2 className="section-title">Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <i className="ri-code-s-slash-line"></i>
            <h3>Web Development</h3>
            <p>Responsive websites with modern frameworks like React, Node.js, and Express.</p>
          </div>

          <div className="service-card">
            <i className="ri-smartphone-line"></i>
            <h3>Responsive Design</h3>
            <p>Mobile-friendly, cross-browser compatible layouts with smooth UI/UX.</p>
          </div>

          <div className="service-card">
            <i className="ri-database-2-line"></i>
            <h3>Full Stack Apps</h3>
            <p>End-to-end applications with MongoDB, Express, React, and Node.js.</p>
          </div>

          <div className="service-card">
            <i className="ri-paint-brush-line"></i>
            <h3>Animations & UI</h3>
            <p>Interactive and engaging interfaces with GSAP & Three.js.</p>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="project-section" ref={sectionRef}>
        <h2 className="section-title">Projects</h2>
        <div className="project-grid">
          {repos.map(repo => (
            <div className="project-card" key={repo.id}>
              <h3>{repo.name}</h3>
              <p>{repo.description || 'No description provided.'}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" ref={sectionRef}>
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Your Name"
              {...register('name', { required: true })}
            />
            {errors.name && <span className="error-msg">Name is required</span>}

            <input
              type="text"
              placeholder="Mobile no."
              {...register('number', { required: true })}
            />
            {errors.number && <span className="error-msg">Mobile number is required</span>}

            <input
              type="email"
              placeholder="Your Email"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="error-msg">Email is required</span>}

            <textarea
              placeholder="Your Message"
              rows="5"
              {...register('message', { required: true })}
            ></textarea>
            {errors.message && <span className="error-msg">Message is required</span>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>
          </form>

          <div className="contact-links">
            <h3>Connect:</h3>
            <div className="info">
              <p><i className="ri-phone-fill"></i> <Link className='p' to="tel:+918358958635">+91 8358958635</Link></p>
              <p><i className="ri-mail-line"></i> <Link className='p' to="mailto:adarshkushwaha8358@gmail.com">adarshkushwaha8358@gmail.com</Link></p>
            </div>

            <div className="social-icons">
              <a
                href="https://wa.me/918358958635?text=Hi%20Adarsh%2C%20I%20just%20visited%20your%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-whatsapp-line"></i>
              </a>
              <a href="https://www.linkedin.com/in/adarsh-kushwaha-a39259272" target="_blank" rel="noopener noreferrer">
                <i className="ri-linkedin-box-fill"></i>
              </a>
              <Link to="mailto:adarshkushwaha8358@gmail.com">
                <i className="ri-mail-fill"></i>
              </Link>
              <a href="https://www.instagram.com/adarshkushwaha444" target="_blank" rel="noopener noreferrer">
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home
