import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>About Mini <span>Blog</span></h2>
      <p>This project consists on a blog made using React in front-end and Firebase as Back-end</p>
      <Link to="/posts/create" className="btn">
        Create Post
      </Link>
    </div>    
  )
}

export default About
