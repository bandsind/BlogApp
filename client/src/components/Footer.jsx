import React from 'react'
import Logo from "../img/logo.png" // Importing the logo image

// Footer component definition
const Footer = () => {
  return (
    // JSX for the footer
    <footer>
      <img src={Logo} alt="Logo" /> {/* Logo image */}
      <span>Made with  Love  and <b>React.js</b>.</span> {/* Footer text */}
    </footer>
  )
}

export default Footer // Exporting the Footer component for use in other parts of the app
