// npm modules
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user } = props

  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  return (
    <nav>
      <div className="app-header">
        <img src="/sell-icon.png" alt="" id="app-img"/>
        <button onClick={toggleNav} className="nav-btn">
          <img src="/hamburger-icon.png" alt="" id="nav-img"/>
        </button>
      </div>
      {(toggleMenu || screenWidth > 575) && (
        <div className="list">
          <p className="items"><NavLink to="/">Home</NavLink></p>
          <p className="items"><NavLink to="/profile">Profile</NavLink></p>
          <p className="items"><NavLink to="/listings/create">Create Listing</NavLink></p>
          <p className="items"><NavLink to="/listings">Browse Listings</NavLink></p>
          {/* <li><NavLink to="/profiles">Profiles</NavLink></li> */}
        </div>
      )}


    </nav>
  )
}

export default NavBar
