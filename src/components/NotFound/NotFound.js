import React from 'react'

import { Link } from 'react-router-dom'
import NotFoundImg from './NotFoundImg.png'

import './NotFound.css'

const NotFound = () => (
  <div className="not-found">
    <img className="not-found-img" src={`/${NotFoundImg}`} alt="Not Found" />
    <Link to="/board" className="btn-regular btn-block btn-link btn-violet">Go Home</Link>
  </div>
)

export default NotFound
