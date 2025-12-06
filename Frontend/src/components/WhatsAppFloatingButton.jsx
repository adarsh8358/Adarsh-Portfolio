import React from "react";
import "./WhatsAppFloatingButton.scss";

const WhatsAppFloatingButton = () => {
  return (
    <div className="whatsapp-float">
      <a
        href="https://wa.me/918358958635?text=Hi%20Adarsh%2C%20I%20just%20visited%20your%20portfolio.%20Can%20I%20get%20more%20info%20about%20your%20services%3F"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="ri-whatsapp-line"></i>
      </a>
    </div>
  );
};

export default WhatsAppFloatingButton;
