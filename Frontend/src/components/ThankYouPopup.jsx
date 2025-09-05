import React, { useEffect, useState } from 'react'
import './ThankYouPopup.scss'

const ThankYouPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content">
        {/* <i className="ri-close-circle-line close-icon" ></i> */}
        <i className="ri-close-line" onClick={onClose}></i>
        <h2>{/*🎉*/} Thank You for <br /> Visiting! 👋</h2>
        <p>I appreciate your time. Feel free to explore my portfolio 🚀</p>
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  )
}

export default ThankYouPopup
